import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceiptEntryPage } from './receipt-entry.page';
import { ReceiptEntryService } from './receipt-entry.service';
import { AppHeaderModule } from '../app-header/app-header.module';

const routes: Routes = [
  {
    path: '',
    component: ReceiptEntryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppHeaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReceiptEntryPage
  ],
  providers: [
    ReceiptEntryService
  ]
})
export class ReceiptEntryPageModule {}
