import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../../environments/environments';


@Pipe({
  name: 'vehicleTypetoName'
})
export class VehicleTypetoNamePipe implements PipeTransform {

  private adminIds: { [key: number]: string } = environments.vehicleTypes;

  transform(value: number) {
    return this.adminIds[value] || 'Unknown';
  }

}
