import { Component, OnInit } from '@angular/core';

declare var BASEPATH: string;
declare var MENUDATA: Array<any>;

@Component({
  selector: 'app-entry',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  username = 'aaaa';
  menudata: any[];

  constructor() { }
  ngOnInit() {
    this.menudata = this.convertMenudata();
  }

  convertMenudata () {
    const menuMap = new Map<number, any>();
    const roots = [];
    const menus = MENUDATA.filter(m => m.category !== 'a')
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
