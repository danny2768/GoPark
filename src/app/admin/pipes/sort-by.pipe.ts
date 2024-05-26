import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../shared/interfaces';


@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(users: User[], sortBy?: keyof User | 'admin' | ''): User[] {
    switch (sortBy) {
      case 'id':
        return users.sort((a, b) => (a.id > b.id ? 1 : -1));

      case 'name':
        return users.sort((a, b) => (a.name > b.name ? 1 : -1));

      case 'surname':
        return users.sort((a, b) => (a.surname > b.surname ? 1 : -1));

      case 'email':
        return users.sort((a, b) => (a.email > b.email ? 1 : -1));

      case 'documentNumber':
        return users.sort((a, b) => (a.documentNumber > b.documentNumber ? 1 : -1));

      case 'role':
        return users.sort((a, b) => (a.role > b.role ? 1 : -1));

      case 'admin':
        return users.sort((a, b) => (a.role > b.role ? 1 : -1));

      // case 'admin':
      //     return users.filter(user => user.name.includes('THAdmin')).sort((a, b) => (a.name > b.name ? 1 : -1));

      default:
        return users;
    }
  }
}
