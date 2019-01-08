import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { RouterExtensionsService } from './router-extensions.service';
import { AppConfig } from './app.config';
import { Title } from '@angular/platform-browser';
import { NbSpinnerService } from './nbspinner.service';
import { CommonService } from './common.service';
import { AuthService } from './app.authService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  // public appPages = [];
  constructor(
    private titleService: Title,
    private platform: Platform,
    public appConfig: AppConfig,
    private router: Router,
    public nbSpinnerService: NbSpinnerService,
    public authService: AuthService,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public commonService: CommonService,
    private routerExtensions: RouterExtensionsService
  ) {
    // this.splashScreen.hide();
    // console.log(platform.platforms());
    this.initializeApp();
  }
  ngOnInit() {

  }
  ionViewDidEnter() {
    // console.log('entered into page1', this.router.url);
  }
  canMenuHide() {
    const url = this.routerExtensions.currentPage.toLowerCase();
    return url === '' || url.startsWith('/login') || url.startsWith('/page');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.titleService.setTitle(this.appConfig.getProjectName());
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
  onMenuItemClick(p: any) {
    if (this.commonService.isMobile && p.title === this.commonService.menuPages[this.commonService.menuPages.length - 1].title) {
      this.authService.logout();
    } else {
      this.router.navigateByUrl(p.url);
    }
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
