import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spot } from '../../../shared/interfaces/spot.interface';

@Component({
  selector: 'app-parking-spots',
  templateUrl: './parking-spots.component.html',
  styleUrl: './parking-spots.component.css'
})
export class ParkingSpotsComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;
  private subscription1?: Subscription;
  private subscription2?: Subscription;

  public dialogInfo = {
    title: 'Error',
    description: 'An error has occurred.',
    showDialog: false,
  };

  private parkingId: string = '';
  public spots: Spot[] = [];

  public searchText: string = '';
  public orderby?: keyof Spot;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        tap( ({ id }) => this.parkingId = id),
        switchMap( ({ id }) => this.adminService.getSpotsByParkingId( id ).pipe(
          catchError( error => {
            if (error.status === 400 ) {
              this.router.navigate(['/admin/parking']);
              return of([]);
            }
            throw error;
          })
        ))
      )
      .subscribe( spots => {
        // if (spots.length === 0) return this.router.navigate(['/admin/parking']);
        return this.spots = spots;
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getSpots() {
    this.subscription2 = this.adminService.getSpotsByParkingId( this.parkingId ).subscribe({
      next: (spots) => {
        this.spots = spots;
      },
      error: (error) => {
        this.dialogInfo.showDialog = true;
        this.dialogInfo.title = error.status;
        this.dialogInfo.description = error.message;
        console.error(error);
      }
    })
  }

  changeOrder( value: keyof Spot ){
    this.orderby = value;
  }

  deleteSpot( id: string ) {
    this.subscription1 = this.adminService.deleteSpotById( id )
      .subscribe( wasDeleted => {
        if (!wasDeleted) {
          this.dialogInfo.title = 'Error';
          this.dialogInfo.description = `Something has happened while trying to delete spot ${id}`;
          this.dialogInfo.showDialog = true;
          return false
        }

        this.dialogInfo.title = 'Success';
        this.dialogInfo.description = `Spot ${id} deleted`;
        this.dialogInfo.showDialog = true;
        this.getSpots();
        return true;
      })
  }

  onDialogClose() {
    this.dialogInfo.showDialog = false;
  }

  exportSpotsToCSV() {
    let csvData = 'ID,License Plate,Payment Status,Arrival Time,Parking Id,Vehicle Type,\n';
    this.spots.forEach(spot => {
      csvData += `${spot.id},${spot.licensePlate},${spot.paymentStatus},${spot.arrivalTime},${spot.parking},${spot.vehicleType}\n`;
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('hidden', '');
    link.setAttribute('href', url);
    link.setAttribute('download', `spots-of-Parking-${this.parkingId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
