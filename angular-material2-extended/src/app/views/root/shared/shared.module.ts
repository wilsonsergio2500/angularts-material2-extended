/// <reference path="guards/auth.guard.ts" />

import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatInputModule, MatSelectModule,
  MatProgressSpinnerModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatMenuModule,
  MatStepperModule, MatCardModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FileUploadModule } from 'ng2-file-upload';

import { CUSTOM_COMPONENTS, CUSTOM_PROVIDERS } from '../../../components/index';
import { FORMLY_CONTROLS_COMPONENTS, FORMLY_CONTROLS_CONFIG } from '../../../fomly-fields/extensions/index';
import { CUSTOM_DIRECTIVES } from '../../../directives/index';
import { SHARED_SERVICES } from './services/shared-services';
import { firebaseProviders } from './services/firebase/firebaseProviders';
import { AuthGuard } from './guards/auth.guard';

const Providers = [
   AuthGuard,
   ...CUSTOM_PROVIDERS(),
   ...firebaseProviders(),
   SHARED_SERVICES
];


@NgModule({
  declarations: [
    ...CUSTOM_COMPONENTS(),
    ...FORMLY_CONTROLS_COMPONENTS()
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormlyModule.forRoot(FORMLY_CONTROLS_CONFIG),
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FlexLayoutModule,
    FileUploadModule,

    // ANGULAR MATERIAL
    MatFormFieldModule,
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
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule

  ],
  exports: [
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule,
    FlexLayoutModule,
    FileUploadModule,
    // ANGULAR MATERIAL
    MatFormFieldModule,
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
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,

    // COMPONENTS
    ...CUSTOM_COMPONENTS(),
    ...FORMLY_CONTROLS_COMPONENTS(),
  ],
  providers: [

  ].concat(Providers),
  entryComponents: [
    ...CUSTOM_COMPONENTS()
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...Providers]
    };
  }
}
