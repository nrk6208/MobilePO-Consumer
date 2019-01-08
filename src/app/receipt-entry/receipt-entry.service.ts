import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable()
export class ReceiptEntryService {
    constructor (private http: HttpClient,
        private appConfig: AppConfig) {
    }
    getEntries(gateEntryNumber) {
        return this.http.get(`${this.appConfig.getUrl('GetGateEntriesByGateEntryNumber')}/${gateEntryNumber}`);
    }
    postReceipt(body: any) {
        return this.http.post(this.appConfig.getUrl('PostReceipt'), body);
    }
}
