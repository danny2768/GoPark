import { Pipe, PipeTransform } from '@angular/core';
import { Spot } from '../../shared/interfaces/spot.interface';


@Pipe({
  name: 'spotSortBy',
})
export class SpotSortByPipe implements PipeTransform {
  transform(spots: Spot[], sortBy?: keyof Spot): Spot[] {
    switch (sortBy) {
      case 'id':
        return spots.sort((a, b) => (a.id > b.id ? 1 : -1));

      case 'licensePlate':
        return spots.sort((a, b) => (a.licensePlate > b.licensePlate ? 1 : -1));

      case 'paymentStatus':
        return spots.sort((a, b) => (a.paymentStatus > b.paymentStatus ? 1 : -1));

      default:
        return spots;
    }
  }
}
