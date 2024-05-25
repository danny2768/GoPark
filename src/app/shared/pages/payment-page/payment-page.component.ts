import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  parkingId: string = '';
  licensePlate: string = '';

  public myForm: FormGroup = this.fb.group({});


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      const { location, licensePlate } = params;
      this.parkingId = location;
      this.licensePlate = licensePlate;
    })
  }

}
