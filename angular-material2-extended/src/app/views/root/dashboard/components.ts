/// <reference path="formly-layout/fomly-layout.component.ts" />

import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component'
import { VanillaFormlyComponent } from './vanilla-formly/vanilla-formly.component';
import { FormlyFieldsTypesComponent } from './formly-fields/formly-fields.component';
import { FormlyLayoutComponent } from './formly-layout/fomly-layout.component'


export const DASHBOARD_COMPONENTS : any[] = [
  DashboardComponent,
  MainComponent,
  VanillaFormlyComponent,
  FormlyFieldsTypesComponent,
  FormlyLayoutComponent
]
