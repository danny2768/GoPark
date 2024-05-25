import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  parkingId: string = '';
  licensePlate: string = '';

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      const { location, licensePlate } = params;
      this.parkingId = location;
      this.licensePlate = licensePlate;
    })
  }

}
