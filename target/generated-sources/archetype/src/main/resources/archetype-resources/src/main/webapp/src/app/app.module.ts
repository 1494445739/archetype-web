import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@tzg/web-shared';
import { AuthModule } from '@tzg/web-auth';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    AuthModule,

    AppRoutes
  ],
  declarations: [AppComponent],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
