import { Component, OnDestroy, OnInit } from '@angular/core';
import { Parking } from '../../../shared/interfaces/parking.interface';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { ParkingForm } from '../../components/parking-form-modal/parking-form-modal.component';

interface DialogInfo {
  show: boolean;
  title: string;
  description: string;
}


@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public parkings: Parking[] = [];

  public dialogInfo: DialogInfo = {
    show: false,
    title: 'Error',
    description: 'Something has happened.',
  }

  public showFormDialog: boolean = false;
  public parkingFormInfo: ParkingForm = {
    title: '',
    action: 'create',
    parkingId: '',
  }

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getParkings();
  };

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  getParkings(): void {
    this.subscription = this.adminService.getParkings().subscribe({
      next: parkings => this.parkings = parkings,
      error: (error) => {
        this.dialogInfo.title = `Error - ${error.status}`;
        this.dialogInfo.description = error.message;
        this.dialogInfo.show = true;
        console.log(error);
      }
    });
  };

  deleteParking(id: string): boolean {
    if ( true ) {
      this.subscription1 = this.adminService.deleteParkingById( id )
        .subscribe( wasDeleted => {
          if ( !wasDeleted ) {
            this.dialogInfo.title = 'Error';
            this.dialogInfo.description = 'Something has happened.';
            this.dialogInfo.show = true;
            return false
          }

          this.dialogInfo.title = 'Success';
          this.dialogInfo.description = `Parking ${id} deleted`;
          this.dialogInfo.show = true;
          this.getParkings();
          return true;
        })
    }

    return false
  }

  displayFormDialog( action: 'create' | 'update', parkingId?: string ): void {
    if (action === 'update') {
      this.parkingFormInfo.title = `Update parking`;
      this.parkingFormInfo.parkingId = parkingId;
    } else {
      this.parkingFormInfo.title = `Create parking`;
    }
    this.parkingFormInfo.action = action;
    this.showFormDialog = true;
  }

  onDialogClose(): void {
    this.dialogInfo.show = false;
  }

  onFormDialogClose(): void {
    this.showFormDialog = false;
    this.getParkings();
  }

  exportParkingsToCSV() {
    let csvData = 'ID,Location,Capacity,Available\n';
    this.parkings?.forEach(parking => {
      csvData += `${parking.id},${parking.location},${parking.capacity},${parking.available}\n`;
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('hidden', '');
    link.setAttribute('href', url);
    link.setAttribute('download', 'parking-spaces.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
