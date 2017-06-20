import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService, Result } from '@tzg/web-shared';

export interface MenuItem {
  id: number;
  pid: number;
  name: string;
  category: 'd' | 'm' | 'a';
  uri: string;
  seq: number;
}

@Injectable()
export class AppService extends BaseService<MenuItem> {
  listUrl = 'auth/authz';
  getUrl: string;
  addUrl: string;
  editUrl: string;
  deleteUrl: string;

  constructor(protected http: Http) {
    super(http);
  }
}

