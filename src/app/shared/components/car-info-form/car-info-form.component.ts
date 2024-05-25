import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { Parking } from '../../interfaces/parking.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-car-info-form',
  templateUrl: './car-info-form.component.html',
  styleUrl: './car-info-form.component.css'
})
export class CarInfoFormComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public parkings: Parking[] = [];

  public myForm: FormGroup = this.fb.group({
    location: ['', [Validators.required]],
    licensePlate: ['', [Validators.required]],
  });

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // get parking locations
    this.subscription = this.sharedService.getParkings().subscribe({
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): boolean {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.warn('Invalid form');
      return false;
    }

    const formValues = this.myForm.value;
    this.router.navigate(['/payment'], { queryParams: formValues});
    return true;
  }

  formatLicensePlate(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/-/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    input.value = value.toUpperCase();
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
