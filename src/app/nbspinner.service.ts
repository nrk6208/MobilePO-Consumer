import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NbSpinnerService {
  display = false;
  constructor() { }
  show() {
    this.display = true;
  }
  hide() {
    this.display = false;
  }
}
