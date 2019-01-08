import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../app.authService';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._authService.getUser();

    if (next.data.roles.indexOf(Math.floor(user.RoleRank / 10) + 1) > -1) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }
}
