import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarInfoFormComponent } from './components/car-info-form/car-info-form.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HomePageComponent,
    PaymentPageComponent,
    ModalDialogComponent,
    CarInfoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HomePageComponent,
    PaymentPageComponent,
    ModalDialogComponent,
  ]
})
export class SharedModule { }
