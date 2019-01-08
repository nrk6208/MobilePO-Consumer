import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    AppHeaderComponent
  ],
  exports: [
    AppHeaderComponent
  ]
})
export class AppHeaderModule { }
