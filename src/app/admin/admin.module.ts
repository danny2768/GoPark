import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ParkingComponent } from './pages/parking/parking.component';
import { SharedModule } from '../shared/shared.module';
import { SortByPipe } from './pipes/sort-by.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormModalComponent } from './components/form-modal/user-form-modal.component';
import { AdminIdtoNamePipe } from './pipes/adminIdtoName.pipe';


@NgModule({
  declarations: [
    // Pipes
    SortByPipe,
    SearchPipe,
    AdminIdtoNamePipe,

    DashboardComponent,
    UsersComponent,
    LayoutPageComponent,
    SidebarComponent,
    ParkingComponent,
    UserFormModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
