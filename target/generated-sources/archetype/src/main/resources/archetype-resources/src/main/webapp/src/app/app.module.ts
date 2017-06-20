import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@tzg/web-shared';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AuthModule  } from '@tzg/web-auth';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    AuthModule,

    AppRoutes
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
