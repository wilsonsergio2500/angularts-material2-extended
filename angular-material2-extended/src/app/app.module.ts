import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule,
  MatProgressSpinnerModule, MatListModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


import { ROOT_ROUTES } from './views/root/root-routes'





//components
import { AppComponent } from './app.component';
import { CUSTOM_COMPONENTS} from './components/index';
import { ROOT_COMPONENTS } from './views/root/components'



@NgModule({
  declarations: [
    AppComponent,


    CUSTOM_COMPONENTS,
    ROOT_COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROOT_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,

    //material
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
