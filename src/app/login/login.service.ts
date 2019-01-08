import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable()
export class LoginService {
    constructor (private http: HttpClient,
        private appConfig: AppConfig) {
    }
    login(body: any) {
        return this.http.post(this.appConfig.getUrl('Login'), body);
    }
}
