import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../app.authService';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() name = '';
  constructor(public commonService: CommonService,
    public authService: AuthService) { }

  ngOnInit() {
  }

}
