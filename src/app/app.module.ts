import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './app.authService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './Interceptor.service';
import { CommonService } from './common.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSpinnerService } from './nbspinner.service';
import { AppConfig } from './app.config';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { RouterExtensionsService } from './router-extensions.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalModule, AccordionModule } from 'ngx-bootstrap';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      newestOnTop: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    StatusBar,
    // SplashScreen,
    BarcodeScanner,
    // AuthGuard,
    AuthService,
    CommonService,
    NbSpinnerService,
    RouterExtensionsService,
    { provide: 'Window',  useValue: window },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
