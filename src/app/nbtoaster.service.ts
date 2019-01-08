import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { ToastController } from '@ionic/angular';
// import { RouterExtensionsService } from './router-extensions.service';
import { AppConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class NbToasterService {
  constructor(private toastrService: ToastrService,
    private appConfig: AppConfig,
    // private routerExtensionsService: RouterExtensionsService,
    // private toastController: ToastController
    ) { }

  async show(message: string, isSuccess: boolean = true) {
    // if (this.routerExtensionsService.isMobile) {
      // const toast = await this.toastController.create({
      //   message: 'mobile toast',
      //   duration: 300000,
      //   // showCloseButton: true,
      //   position: 'bottom',
      //   closeButtonText: 'Close'
      // });
      // toast.present();
    // } else {
      if (isSuccess) {
        this.toastrService.success(message, this.appConfig.getProjectName());
      } else {
        this.toastrService.error(message, this.appConfig.getProjectName());
      }
    // }
  }
}
