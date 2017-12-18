import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatInputModule,
  MatProgressSpinnerModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatMenuModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


import { ROOT_ROUTES } from './views/root/root-routes'


//components
import { AppComponent } from './app.component';
import { CUSTOM_COMPONENTS, CUSTOM_PROVIDERS} from './components/index';
import { ROOT_COMPONENTS } from './views/root/components'
import { FORMLY_CONTROLS_CONFIG, FORMLY_CONTROLS_COMPONENTS} from './fomly-fields/extensions/index'


@NgModule({
  declarations: [
    AppComponent,


    CUSTOM_COMPONENTS,
    ROOT_COMPONENTS,
    FORMLY_CONTROLS_COMPONENTS
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROOT_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(FORMLY_CONTROLS_CONFIG),
    FormlyMaterialModule,
     MatFormFieldModule,

    //material
   
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatMenuModule

  ],
  providers: [
    CUSTOM_PROVIDERS
    ],
  entryComponents: [
    CUSTOM_COMPONENTS
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
