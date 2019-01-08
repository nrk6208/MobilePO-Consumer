import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ShipmentModel } from '../interfaces/shipmentModel';
import { GateEntryService } from './gate-entry.service';
import { CommonService } from '../common.service';
import { AuthService } from '../app.authService';

@Component({
  selector: 'app-gate-entry',
  templateUrl: 'gate-entry.page.html',
  styleUrls: ['gate-entry.page.scss'],
})
export class GateEntryPage implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  modalRef: BsModalRef;
  invoiceNumber = '';
  gateEntryNumber = '';
  shipment: ShipmentModel;
  constructor(private service: GateEntryService,
    public commonService: CommonService,
    public authService: AuthService,
    private modalService: BsModalService) {
  }
  ngOnInit() {
    // this.reset();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ionViewDidEnter() {
    this.reset();
  }
  reset() {
    this.shipment = undefined;
    this.invoiceNumber = '';
  }
  fetch() {
    this.commonService.spinner.show();
      this.service.getShipmentByInvoiceNumber(this.invoiceNumber).subscribe((res: ShipmentModel) => {
        this.reset();
        if (!res) {
          this.commonService.toaster.show('No records found.');
        } else {
          res.Lines = this.commonService.bindCollapseListData(res.Lines);
          this.shipment = res;
        }
        this.commonService.spinner.hide();
    });
  }
  scan() {
    this.commonService.barcodeScanner.scan().then((res) => {
      this.invoiceNumber = res.text.toUpperCase();
    }, (err) => {
      this.commonService.toaster.show(err, false);
    });
  }
  gateIn() {
    this.commonService.spinner.show();
    this.service.postGateEntry({
      ShipmentId: this.shipment.ShipmentId,
      // GateEntryNumber: this.generateGateEntryNumber()
    }).subscribe((res: any) => {
      this.reset();
      this.gateEntryNumber = res.GateEntryNumber;
      // show the modal popup to show gateEntryNumber as barcode
      this.openModal(this.template);
      this.commonService.spinner.hide();
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // generateGateEntryNumber() {
  //   // this.gateEntryNumber = new Date().valueOf().toString();
  //   this.gateEntryNumber = 'GE' + new Date().getTime().toString(36).toUpperCase();
  //   return this.gateEntryNumber;
  // }
  // canColumnHide() {
  //   return this.shipment.GateEntryNumber !== '';
  // }
  hideGateEnteyModal() {
    this.gateEntryNumber = '';
    this.modalRef.hide();
  }
}
