import { Component, OnInit } from '@angular/core';
import { AppService, MenuItem } from './app.service';
import { Alert } from '@tzg/ng-shared';

declare var BASEPATH: string;

@Component({
  selector: 'app-entry',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  username = '';
  menudata: any[];

  constructor(private service: AppService) { }
  ngOnInit() {
    this.service.list({}).subscribe(result => {
      if (result.status === 'ok') {
        this.menudata = this.convertMenudata(result.data as MenuItem[]);
      } else {
        Alert(result.data as string);
      }
    }, err => {
      Alert(err);
    });
  }

  convertMenudata (menudata: MenuItem[]) {
    const menuMap = new Map<number, any>();
    const roots = [];
    const menus = menudata.filter(m => m.category !== 'a')
    .sort((a, b) => { return a.seq - b.seq; })
    .map(m => {
      const menuitem = {
        id: m.id,
        pid: m.pid,
        name: m.name,
        route: m.category === 'm' ? m.uri : null,
        children: null
      };
      menuMap.set(menuitem.id, menuitem);
      return menuitem;
    }).forEach(m => {
      if (m.pid === 0) {
        roots.push(m);
      } else {
        const parent = menuMap.get(m.pid);
        if (!parent.children) { parent.children = []; }
        parent.children.push(m);
      }
    });

    return roots;
  }

  logout () {
    location.href = BASEPATH + 'auth/logout';
  }
}
