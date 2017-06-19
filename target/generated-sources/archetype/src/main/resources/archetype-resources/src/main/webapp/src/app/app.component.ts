import { Component, OnInit } from '@angular/core';

declare var BASEPATH: string;

@Component({
  selector: 'app-entry',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  username = '';
  menudata: any[];

  constructor() { }
  ngOnInit() {
    this.menudata = [
    ];
  }

  logout () {
    location.href = BASEPATH + 'auth/logout';
  }
}
