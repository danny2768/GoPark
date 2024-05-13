import { Pipe, PipeTransform } from '@angular/core';
import { environments } from '../../../environments/environments';


@Pipe({
  name: 'adminIdtoName'
})
export class AdminIdtoNamePipe implements PipeTransform {

  private adminIds: { [key: number]: string } = environments.roleTypes;

  transform(value: number) {
    return this.adminIds[value] || 'Unknown';
  }

}
