import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { NbSpinnerService } from './nbspinner.service';

@Injectable({
 providedIn: 'root'
})
export class AppConfig {
    environment = environment.production ? 'production' : 'development';
    apiUrl = '';
    private data: any;
    constructor(private http: HttpClient,
        private nbSpinnerService: NbSpinnerService) {
    }

    getUrl(key: string) {
        if (this.data && this.data[key]) {
            return this.data[key].startsWith('http') ? this.data[key] : `${this.data['apiUrl']}/${this.data[key]}`;
        } else {
            return '';
        }
    }
    getIcon() {
        return `assets/icon/${this.data['IconFileName']}`;
    }
    getLogo() {
        return `assets/images/${this.data['LogoFileName']}`;
    }
    getProjectName() {
        return `${this.data['ProjectName']}`;
    }

    public load() {
        // this.nbSpinnerService.show();
        return new Promise((resolve, reject) => {
            this.http.get('assets/config.json').subscribe((responseData) => {
                this.data = responseData;
                this.apiUrl = responseData['apiUrl'];
                resolve(true);
            },
            (error: any): any => {
                console.log('Configuration file "config.json" could not be read');
                resolve(true);
                return Observable.throw(error || 'Server error');
            });
        });
    }
}
