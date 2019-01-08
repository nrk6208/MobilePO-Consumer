import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NbToasterService } from './nbtoaster.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NbSpinnerService } from './nbspinner.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isMobile = false;
  // tslint:disable-next-line:no-unused-expression
  public menuPages = [];
  private pages = [
    {
      title: 'Gate Entry',
      url: '/gateentry',
      icon: 'home'
    },
    {
      title: 'Receipt Entry',
      url: '/receiptentry',
      icon: 'clipboard'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];
  constructor(public barcodeScanner: BarcodeScanner,
    private router: Router,
    // @Inject(DOCUMENT) private document: Document,
    // @Inject('Window') private window: Window,
    private deviceDetectorService: DeviceDetectorService,
    public spinner: NbSpinnerService,
    public toaster: NbToasterService) {
    this.isMobile = !deviceDetectorService.isDesktop();
    // console.log('isDesktop', !this.isMobile);
  }
  bindCollapseListData(data: any) {
    if (data instanceof Array) {
      data.forEach(function (e) {
        e.showDetails = false;
        e.icon = 'ios-add-circle-outline'; // ios-remove-circle-outline
      });
    } else {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline'; // ios-remove-circle-outline
    }
    return data;
  }
  toggleCollapseList(index, originalList: Array<any>) {
    for (let i = 0; i < originalList.length; i++) {
      if (i === index) {
        originalList[i].showDetails = !originalList[i].showDetails;
        // tslint:disable-next-line:max-line-length
        originalList[i].icon = (originalList[i].icon === 'ios-add-circle-outline') ? 'ios-remove-circle-outline' : 'ios-add-circle-outline';
      } else {
        originalList[i].showDetails = false;
        originalList[i].icon = 'ios-add-circle-outline';
      }
    }
    return originalList;
  }
  loadMenuPages(roleRank) {
    this.menuPages = [];
    if (this.isMobile) {
      this.menuPages.push(this.pages[2]);
    }
    switch (Math.floor(roleRank / 10)) {
      case 0:
        this.menuPages = this.pages.slice(0, this.pages.length);
        this.router.navigateByUrl(this.menuPages[0].url);
        break;
      case 1:
        this.menuPages = this.pages.slice(0, 2);
        this.router.navigateByUrl(this.menuPages[1].url);
        break;
      case 2:
        this.menuPages = this.pages.slice(0, 2);
        this.router.navigateByUrl(this.menuPages[1].url);
        break;
      case 3:
        this.menuPages = this.pages.slice(0, 1);
        this.router.navigateByUrl(this.menuPages[0].url);
        break;
      default:
        this.menuPages = this.pages.slice(0, 1);
        this.router.navigateByUrl(this.menuPages[0].url);
        break;
    }
  }
}
