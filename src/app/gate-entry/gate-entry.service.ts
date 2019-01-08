import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable()
export class GateEntryService {
    constructor (private http: HttpClient,
        private appConfig: AppConfig) {
    }
    getShipmentByInvoiceNumber(invoiceNumber) {
        return this.http.get(`${this.appConfig.getUrl('GetShipmentByInvoiceNumber')}/${invoiceNumber}`);
    }
    postGateEntry(body: any) {
        return this.http.post(this.appConfig.getUrl('PostGateEntry'), body);
    }
}
