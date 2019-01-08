import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { NbSpinnerService } from './nbspinner.service';
import { CommonService } from './common.service';
import { AuthService } from './app.authService';

@Injectable({
  providedIn: 'root'
})
export class RouterExtensionsService {
currentPage = '';
  constructor(private authService: AuthService,
    private commonService: CommonService,
  private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.commonService.spinner.show();
        // console.log(event.url);
        this.currentPage = event.url;
        if (this.currentPage === 'login') {
          this.authService.logout();
        }
      } else if (event instanceof NavigationEnd) {
        this.commonService.spinner.hide();
      } else if (event instanceof NavigationCancel) {
          this.commonService.spinner.hide();
       }
    });
  }
  PageRefresh() {
    window.location.reload();
  }
}
