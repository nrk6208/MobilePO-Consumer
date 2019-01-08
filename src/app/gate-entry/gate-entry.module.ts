import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { GateEntryPage } from './gate-entry.page';
import { GateEntryService } from './gate-entry.service';
import { AppHeaderModule } from '../app-header/app-header.module';

const routes: Routes = [
  {
    path: '',
    component: GateEntryPage
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
    GateEntryPage
  ],
  providers: [
    GateEntryService
  ]
})
export class GateEntryPageModule {}
