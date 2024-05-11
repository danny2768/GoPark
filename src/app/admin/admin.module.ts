import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ParkingComponent } from './pages/parking/parking.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    LayoutPageComponent,
    SidebarComponent,
    ParkingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
