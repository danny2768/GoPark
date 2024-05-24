import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { ParkingComponent } from './pages/parking/parking.component';
import { ParkingSpotsComponent } from './pages/parking-spots/parking-spots.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent},
      { path: 'parking', component: ParkingComponent},
      { path: 'parking/:id', component: ParkingSpotsComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
