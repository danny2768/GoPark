import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Parking } from '../../../shared/interfaces/parking.interface';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ParkingForm {
  title: string;
  action: 'create' | 'update';
  parkingId?: string;
}

@Component({
  selector: 'admin-parking-form-modal',
  templateUrl: './parking-form-modal.component.html',
  styleUrl: './parking-form-modal.component.css'
})
export class ParkingFormModalComponent implements OnInit, OnDestroy{

  @Input({ required: true })
  parkingFormInfo!: ParkingForm;

  @Output()
  closeEvent = new EventEmitter<void>();

  public showForm: boolean = true;

  public dialogMessage = {
    title: 'Error',
    description: 'An error has occurred.',
  };

  public parking?: Parking;

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public myForm: FormGroup = this.fb.group({
    location: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
    available: ['', [Validators.required]],
  });

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if ( this.parkingFormInfo.action === 'update' ) {
      if ( !this.parkingFormInfo.parkingId ) throw new Error('ParkingId is required');
      this.subscription = this.adminService.getParkingById( this.parkingFormInfo.parkingId ).subscribe({
        next: parking => {
          this.parking = parking;
          this.myForm.patchValue(parking);
        },
        error: (error) => {
          console.error('Error al obtener el parqueadero');
          console.error(error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription ) this.subscription.unsubscribe();
  }

  onClose( ) {
    this.closeEvent.emit();
  }

  onSubmit(): boolean {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.warn('Invalid form');
      return false;
    }

    let parking = this.myForm.value as Parking;

    if (this.parkingFormInfo.action === 'create'){
      this.subscription1 = this.adminService.createParking(parking).subscribe({
        next: (resp) => {
          if ( !resp ) {
            this.showMessageInDialog('Error', 'An error occurred while creating the parking space.');
            return false;
          } else {
            this.showMessageInDialog('Success', 'Parking created successfully');
            return true;
          }
        },
        error: (error) => {
          this.showMessageInDialog('Error', 'An error occurred while creating the parking space.');
        }
      });
    }

    if (this.parkingFormInfo.action === 'update') {
      parking = { ...parking, id: this.parking!.id };
      this.subscription1 = this.adminService.updateParking(parking).subscribe({
        next: (resp) => {
          this.showMessageInDialog('Success', 'Parking updated successfully');
        },
        error: (error) => {
          this.showMessageInDialog('Error', 'An error occurred while updating the parking space.');
        }
      });
    }

    return false;
  }

  showMessageInDialog( title: string, message: string):void {
    this.dialogMessage.title = title;
    this.dialogMessage.description = message;
    this.showForm = false;
  }

  getFirstWord(title: string): string {
    return title.split(' ')[0];
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
          return `Este campo es requerido`;
      }
    }
    return null;
  }
}
