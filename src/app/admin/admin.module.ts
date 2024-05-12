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
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // Pipes
    SortByPipe,
    SearchPipe,

    DashboardComponent,
    UsersComponent,
    LayoutPageComponent,
    SidebarComponent,
    ParkingComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class AdminModule { }
