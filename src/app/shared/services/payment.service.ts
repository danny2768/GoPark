import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { PaymentMessageEvent } from '../interfaces/payment-message.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentsBaseUrl = environments.paymentsBaseUrl;

  constructor(
    private http: HttpClient
  ){}

  getServerSentEvent(): Observable<PaymentMessageEvent> {
    return new Observable<PaymentMessageEvent>(observer => {
      const eventSource = new EventSource(`${this.paymentsBaseUrl}/payments`);

      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  sendPaymentMessage( spotId: string ): Observable<boolean> {
    return this.http.post(`${this.paymentsBaseUrl}/payments/request/${spotId}`, {}).pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }

}
