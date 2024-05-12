import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/interfaces';

interface FormDialogInfo {
  title: string;
  action: 'create' | 'update';
}

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public users?: User[];
  public orderby: keyof User | 'admin' |'' = '';
  public searchText: string = '';

  public showFormDialog: boolean = false;
  public formDialogInfo: FormDialogInfo = {
    title: 'Create user',
    action: 'create',
  };
  public userid?: string;

  public showDialog: boolean = false;
  public dialogMessage = {
    title: 'Error',
    description: 'An error has occurred.',
  };

  constructor(
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  createUser(): void {
    this.displayFormDialog('create');
  }

  displayFormDialog( action: 'create' | 'update', userId?: string ): void {
    if (action === 'update') {
      this.formDialogInfo.title = `Update user`;
      this.userid = userId;
    } else { this.formDialogInfo.title = `Create user`;}

    this.formDialogInfo.action = action;
    this.showFormDialog = true;
  }

  getUsers(): void {
    this.subscription = this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.showDialog = true;
        this.dialogMessage.title = error.status;
        this.dialogMessage.description = error.message;
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
  }

  deleteUser( id: string): boolean {

    // const resp = confirm(`Estas seguro de que deseas eliminar al usuario ${id}`)
    // if( resp ) {
    if( true ) {
      this.subscription1 = this.adminService.deleteUserById( id )
      .subscribe( wasDeleted => {
        if ( !wasDeleted ) {
          return false;
        }

        this.showDialog = true;
        this.dialogMessage.title = 'Success';
        this.dialogMessage.description = `User ${id} deleted`;
        this.getUsers();
        return true;
      })
    }
    return false;
  }

  exportUsersToCSV() {
    let csvData = 'ID,Name,Surname,Email,Password,Document Number,Role\n';
    this.users?.forEach(user => {
      csvData += `${user.id},${user.name},${user.surname},${user.email},${user.password},${user.documentNumber},${user.role}\n`;
    });

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('hidden', '');
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onDialogClose(): void {
    this.showDialog = false;
    // this.router.navigate(['./auth/login']);

  }

  onFormDialogClose(): void {
    this.showFormDialog = false;
    this.getUsers();
  }

  changeOrder( value: keyof User | 'admin' ){
    this.orderby = value;
  }
}
