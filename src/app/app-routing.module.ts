import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoleGuard } from './guards/role-guard.service';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gateentry',
    pathMatch: 'full'
  },
  {
    path: 'gateentry',
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [1, 2, 3, 4]},
    loadChildren: './gate-entry/gate-entry.module#GateEntryPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'receiptentry',
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [1, 2, 3]},
    loadChildren: './receipt-entry/receipt-entry.module#ReceiptEntryPageModule'
  },
  {
    path: 'PageNotFoundComponent',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'PageNotFoundComponent'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
