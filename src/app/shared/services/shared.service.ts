import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parking } from '../interfaces/parking.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private baseUrl = environments.baseUrl;
  headers = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private http: HttpClient
  ){}

  getParkings(): Observable<Parking[]> {
    // TODO: update when backend is ready
    return this.http.get<Parking[]>(`${this.baseUrl}/api/parkings`);
    // return this.http.get<Parking[]>(`${this.baseUrl}/api/parkings`, { headers: this.headers });
  }

  getParkingById( id:string ): Observable<Parking> {
    return this.http.get<Parking>(`${this.baseUrl}/api/parkings/${id}`, { headers: this.headers });
  }
}
