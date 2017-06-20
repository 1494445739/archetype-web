import './polyfills';
import './assets/style/common.less';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

declare var ENV: any;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof ENV !== 'undefined' && ENV === 'dev') {
    console.log('Runing in the Development Mode');
  } else {
    enableProdMode();
  }
  platformBrowserDynamic().bootstrapModule(AppModule);
});

