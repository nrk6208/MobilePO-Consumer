import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoginService } from './login.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [
    LoginService
  ]
})
export class LoginPageModule {}
