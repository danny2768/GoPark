import { Pipe, PipeTransform } from '@angular/core';
import { Spot } from '../../shared/interfaces/spot.interface';
import { DatePipe } from '@angular/common';
import { VehicleTypetoNamePipe } from './vehicleTypetoName.pipe';

@Pipe({
  name: 'searchSpot'
})
export class SearchSpotPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe,
    private vehicleTypetoNamePipe: VehicleTypetoNamePipe
  ) {}

  transform(spots: Spot[], searchText: string): Spot[] {
    if (!spots || !searchText) {
      return spots;
    }
    return spots.filter(spot =>
      spot.id.toString().includes(searchText) ||
      spot.licensePlate.toLowerCase().includes(searchText.toLowerCase()) ||
      spot.paymentStatus.toLowerCase().includes(searchText.toLowerCase()) ||
      spot.parking.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      spot.vehicleType.toString().toLowerCase().includes(searchText.toLowerCase()) ||
      (this.vehicleTypetoNamePipe.transform(spot.vehicleType) || '').toLowerCase().includes(searchText.toLowerCase()) ||
      (this.datePipe.transform(spot.arrivalTime, 'MMM d, y, h:mm:ss a') || '').toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
