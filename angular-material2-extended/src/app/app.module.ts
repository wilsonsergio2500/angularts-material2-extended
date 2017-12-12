import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import { APP_ROUTES } from './routes';
import { ROOT_ROUTES } from './views/root/root-routes'



import { AppComponent } from './app.component';

//views
import { HomeViewComponent } from './views/home/home.component';
import { SampleViewComponent } from './views/sample/sample.component';
import { ROOT_COMPONENTS } from './views/root/components'



@NgModule({
  declarations: [
    AppComponent,

    HomeViewComponent,
    SampleViewComponent,

    ROOT_COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROOT_ROUTES),

    //material
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
