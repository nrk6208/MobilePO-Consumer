import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../app.authService';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GateEntryModel } from '../interfaces/gateEntryModel';
import { ReceiptEntryService } from './receipt-entry.service';
import { CommonService } from '../common.service';
import { OrderLinesModel } from '../interfaces/OrderLinesModel';

@Component({
  selector: 'app-receipt-entry',
  templateUrl: './receipt-entry.page.html',
  styleUrls: ['./receipt-entry.page.scss'],
})
export class ReceiptEntryPage implements OnInit {
  @ViewChild('ConfirmModal') ConfirmModal: TemplateRef<any>;
  modalRef: BsModalRef;
  gateEntryNumber = '';
  gateEntry: GateEntryModel = undefined;
  constructor(private service: ReceiptEntryService,
    public authService: AuthService,
    private modalService: BsModalService,
    public commonService: CommonService) {   }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.reset();
  }
  reset() {
    this.gateEntry = undefined;
    this.gateEntryNumber = '';
  }
  fetch() {
    this.commonService.spinner.show();
    this.service.getEntries(this.gateEntryNumber).subscribe((res: GateEntryModel) => {
      this.reset();
      if (res == null || res === undefined) {
        this.commonService.toaster.show('No records found.');
      } else {
        res.Order.Lines = this.commonService.bindCollapseListData(res.Order.Lines);
        res.Order.Lines.forEach(element => {
          element.DeliveredQuantity = element.ShippedQuantity;
        });
        this.gateEntry = res;
      }
        this.commonService.spinner.hide();
    });
  }
  scan() {
    this.commonService.barcodeScanner.scan().then((res) => {
        this.gateEntryNumber = res.text.toUpperCase();
      }, (err) => {
        this.commonService.toaster.show(err, false);
    });
  }
  submit() {
    this.commonService.spinner.show();
    this.service.postReceipt({
      OrderId: this.gateEntry.Order.OrderId,
      GateEntryId: this.gateEntry.GateEntryId,
      ReceiptLines: this.bindReceiptLines()
    }).subscribe((res: any) => {
      this.reset();
      this.commonService.spinner.hide();
    });
  }
  private bindReceiptLines() {
    const inputData: Array<OrderLinesModel> = this.gateEntry.Order.Lines;
    const returnData = [];
    if (inputData) {
      for (let i = 0; i < inputData.length; i++) {
        returnData.push({
          OrderLineId: inputData[i].OrderLineId,
          Quantity: inputData[i].DeliveredQuantity
        });
      }
    }
    return returnData;
  }
  getTotalShippedQuantity() {
    return this.gateEntry.Order.Lines
    .map(e => e.ShippedQuantity)
    .reduce(function(a, b) {
      return a + b;
    });
  }
  getTotalOrderedQuantity() {
    return this.gateEntry.Order.Lines
    .map(e => e.Quantity)
    .reduce(function(a, b) {
      return a + b;
    });
  }
  ReceivedQuantityChange(item, event) {
      if (item.DeliveredQuantity == null || event.target.value === '') {
        // this.nbToasterService.show('You should enter a number, default is \'0\'');
        item.DeliveredQuantity = 0;
      } else if (item.DeliveredQuantity < 0 || Number(event.target.value) < 0) {
        this.commonService.toaster.show('You can\'t enter less than zero', false);
        item.DeliveredQuantity = 0;
      } else if (item.DeliveredQuantity > item.ShippedQuantity || Number(event.target.value) > item.ShippedQuantity) {
        this.commonService.toaster.show('You can\'t enter more than Shipped Quantity', false);
        item.DeliveredQuantity = item.ShippedQuantity;
      } else {
        item.DeliveredQuantity = Number(event.target.value);
      }
  }
  openConfirmationModal() {
    this.modalRef = this.modalService.show(this.ConfirmModal);
  }
  hideConfirmationModal(canSubmit: boolean) {
    this.modalRef.hide();
    if (canSubmit) {
      this.submit();
    }
  }
}
