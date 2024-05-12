import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../shared/interfaces';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], searchText: string): User[] {
    if (!users || !searchText) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.documentNumber.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
