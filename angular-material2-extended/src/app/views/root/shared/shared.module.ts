
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatInputModule, MatSelectModule,
  MatProgressSpinnerModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatMenuModule,
  MatStepperModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';

import { CUSTOM_COMPONENTS, CUSTOM_PROVIDERS } from '../../../components/index';
import { FORMLY_CONTROLS_COMPONENTS, FORMLY_CONTROLS_CONFIG } from '../../../fomly-fields/extensions/index';
import { CUSTOM_DIRECTIVES } from '../../../directives/index';

 const Providers = [
  CUSTOM_PROVIDERS,
];


@NgModule({
  declarations: [
    CUSTOM_COMPONENTS,
    CUSTOM_DIRECTIVES,
    FORMLY_CONTROLS_COMPONENTS
  ],
  imports: [
    FormlyModule.forRoot(FORMLY_CONTROLS_CONFIG),
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,

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
    MatStepperModule

  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule,

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

    // COMPONENTS
    CUSTOM_COMPONENTS,
    CUSTOM_DIRECTIVES,
    FORMLY_CONTROLS_COMPONENTS,
  ],
  providers: [
    CUSTOM_PROVIDERS
  ],
  entryComponents: [
    CUSTOM_COMPONENTS
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
