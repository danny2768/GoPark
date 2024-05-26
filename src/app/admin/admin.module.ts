import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminIdtoNamePipe } from './pipes/adminIdtoName.pipe';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { ParkingComponent } from './pages/parking/parking.component';
import { ParkingFormModalComponent } from './components/parking-form-modal/parking-form-modal.component';
import { ParkingSpotsComponent } from './pages/parking-spots/parking-spots.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchSpotPipe } from './pipes/search-spot.pipe';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { UserFormModalComponent } from './components/form-modal/user-form-modal.component';
import { UsersComponent } from './pages/users/users.component';
import { SpotSortByPipe } from './pipes/sort-by-spot.pipe';
import { VehicleTypetoNamePipe } from './pipes/vehicleTypetoName.pipe';
import { AdvancedPieChartComponent } from './components/advanced-pie-chart/advanced-pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieGridChartComponent } from './components/pie-grid-chart/pie-grid-chart.component';
import { NumberCardsChartComponent } from './components/number-cards-chart/number-cards-chart.component';


@NgModule({
  declarations: [
    // Pipes
    SortByPipe,
    SpotSortByPipe,
    SearchPipe,
    SearchSpotPipe,
    AdminIdtoNamePipe,
    VehicleTypetoNamePipe,

    DashboardComponent,
    UsersComponent,
    LayoutPageComponent,
    SidebarComponent,
    ParkingComponent,
    UserFormModalComponent,
    ParkingFormModalComponent,
    ParkingSpotsComponent,
    AdvancedPieChartComponent,
    PieGridChartComponent,
    NumberCardsChartComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
  providers: [
    DatePipe,
    VehicleTypetoNamePipe,
  ]
})
export class AdminModule { }
