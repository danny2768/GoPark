import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HomePageComponent,
    ModalDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomePageComponent,
    ModalDialogComponent,
  ]
})
export class SharedModule { }
