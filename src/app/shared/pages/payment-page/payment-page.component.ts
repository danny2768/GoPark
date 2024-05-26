import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { Parking } from '../../interfaces/parking.interface';
import { Spot } from '../../interfaces/spot.interface';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public parkings: Parking[] = [];
  public parkingId: string = '';
  private selectedParking?: Parking;
  public licensePlate: string = '';

  public myForm: FormGroup = this.fb.group({
    licensePlate: ['', [Validators.required]],
    parkingId: ['', [Validators.required]],
    cardNumber: ['', [Validators.required]],
  });

  public dialogInfo = {
    title: 'Error',
    description: 'An error has occurred.',
    showDialog: false,
  };

  constructor(
    private paymentService: PaymentService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe( params => {
      const { location, licensePlate } = params;
      this.parkingId = location;
      this.licensePlate = licensePlate;

      if ( location && licensePlate ) {
        this.myForm.patchValue({
          parkingId: this.parkingId,
          licensePlate: this.licensePlate
        })
      }
    })

    this.subscription1 = this.sharedService.getParkings().subscribe({
      next: parkings => {
        this.parkings = parkings;
      },
      error: (error) => {
        console.error('Error al obtener los parqueaderos');
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription1) this.subscription1.unsubscribe();
  }

  onSubmit(): boolean {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const { licensePlate, parkingId, cardNumber, expiryData, cvc } = this.myForm.value;

    if (parkingId) {
      this.sharedService.getParkingById(parkingId).subscribe({
        next: (parking) => {
          this.selectedParking = parking;

          if (licensePlate && this.selectedParking) {
            this.sharedService.getSpotByLicensePlate(licensePlate).subscribe({
              next: (spot) => {
                if (!spot) {
                  this.showDialog('Error', 'License plate not found');
                  return false;
                }

                if (spot.parking !== this.selectedParking!.id) {
                  this.showDialog('Error', 'The license plate does not match the parking location');
                  return false;
                }

                // Start listening for server-sent events
                this.paymentService.getServerSentEvent().subscribe({
                  next: (data) => {
                    // Handle the different responses from the server
                    switch (data.status) {
                      case 'Payment done':
                        this.showDialog('Success', 'Payment done successfully');
                        console.log('Payment done', data);
                        break;

                      case 'Payment already done':
                        this.showDialog('Error', 'Payment already done');
                        console.log('Payment already done', data);
                        break;

                      case 'Spot not found':
                        this.showDialog('Error', 'Spot not found');
                        console.log('Spot not found', data);
                        break;

                      default:
                        this.showDialog('Error', 'Unknown error');
                        console.error('Unknown status', data);
                    }
                  },
                  error: (error) => console.error(error)
                });

                // Send a POST request
                this.paymentService.sendPaymentMessage(spot.id.toString()).subscribe({
                  next: (data) => console.log(data),
                  error: (error) => console.error(error)
                });

                return true;
              },
              error: (error) => {
                console.error(error);
                return false;
              }
            });
          }
        },
        error: (error) => console.error(error)
      });
    }
    return false;
  }

  formatLicensePlate(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/-/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    input.value = value.toUpperCase();
  }

  showDialog( title: string, description: string ) {
    this.dialogInfo.title = title;
    this.dialogInfo.description = description;
    this.dialogInfo.showDialog = true;
  }

  onDialogClose() {
    this.dialogInfo.showDialog = false;
  }

  // # Validaciones de campos
  isFieldInvalid(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `This field is required`;
      }
    }
    return null;
  }
}
