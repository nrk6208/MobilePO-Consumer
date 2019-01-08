import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../app.authService';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import * as $ from 'jquery';
import { CommonService } from '../common.service';
import { LoginService } from './login.service';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showLoginScreen = true;
  loginForm: FormGroup;
  passwordForm: FormGroup;
  loginFormErrors = {
    USER_NAME: '',
    USER_PASSWORD: ''
  };
  passwordFormErrors = {
    USER_NAME: ''
  };
  loginValidationMessages = {
    USER_NAME: {
      required: 'user name is required',
      pattern: 'user name should be in the format of Email'
      // minlength: 'length should be greter than or equal to 3'
    },
    USER_PASSWORD: {
      required: 'password is required',
      minlength: 'length should be greater than or equal to 2'
    }
  };
  passwordValidationMessages = {
    USER_NAME: {
      required: 'user name is required',
      pattern: 'user name should be in the format of Email'
      // minlength: 'length should be greater than or equal to 3'
    }
  };
  fixedMenu: any;
  constructor(private http: HttpClient,
    public commonService: CommonService,
    private service: LoginService,
    public appConfig: AppConfig,
    private fb: FormBuilder,
    private authService: AuthService) {
    }

    ngOnInit() {
      // build the data model for our form
      this.buildForm();
    }
    ionViewDidEnter() {
        this.authService.logout(true);
        this.commonService.spinner.hide();
        this.loginForm.reset();
        this.passwordForm.reset();
        // this.buildForm();
    }
    buildForm() {
      // build our form
      // this.loginForm = this.fb.group({
      //   USER_NAME: ['', [Validators.required, Validators.minLength(3)]],
      //   USER_PASSWORD: ['', [Validators.required, Validators.minLength(2)]]
      // });
      this.loginForm = this.fb.group({
        USER_NAME: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
        USER_PASSWORD: ['', [Validators.required, Validators.minLength(2)]]
      });
      this.passwordForm = this.fb.group({
        USER_NAME: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      });

      // watch for changes and validate
      this.loginForm.valueChanges.subscribe(data => this.loginValidateForm());
      this.passwordForm.valueChanges.subscribe(data => this.passwordValidateForm());
    }
    loginValidateForm() {
      // loop over the formErrors field names
      // tslint:disable-next-line:forin
      for (const field in this.loginFormErrors) {
        // clear that input field errors
        this.loginFormErrors[field] = '';
        // grab an input field by name
        const input = this.loginForm.get(field);
        if (input.invalid && input.dirty) {
          // figure out the type of error
          // tslint:disable-next-line:forin
          for (const error in input.errors) {
            // assign that type of error message to a variable
            this.loginFormErrors[field] = this.loginValidationMessages[field][error];
          }
        }
      }
    }
    passwordValidateForm() {
      // loop over the formErrors field names
      // tslint:disable-next-line:forin
      for (const field in this.passwordFormErrors) {
        // clear that input field errors
        this.passwordFormErrors[field] = '';
        // grab an input field by name
        const input = this.passwordForm.get(field);
        if (input.invalid && input.dirty) {
          // figure out the type of error
          // tslint:disable-next-line:forin
          for (const error in input.errors) {
            // assign that type of error message to a variable
            this.passwordFormErrors[field] = this.passwordValidationMessages[field][error];
          }
        }
      }
    }
    onLoginSubmit() {
        // console.log(this.loginForm.value);
        this.commonService.spinner.show();
        setTimeout(() => {
          this.service.login({
            'UserName': this.loginForm.value.USER_NAME,
            'Password': this.loginForm.value.USER_PASSWORD
          }).subscribe((res) => {
            this.authService.saveLogindata(res);
          });
        });
    }
    onPasswordSubmit() {
      // console.log(this.passwordForm.value);
      this.commonService.toaster.show('Service not available !', false);
      // this.nbSpinnerService.show();
      // setTimeout(() => {
      //   this.http.post(this.appConfig.getUrl('Login'), {
      //     'UserName': this.form.value.USER_NAME,
      //     'Password': this.form.value.USER_PASSWORD
      //   }).subscribe((res) => {
      //     this.authService.saveLogindata(this.form.value);
      //   });
      // });
  }
}
