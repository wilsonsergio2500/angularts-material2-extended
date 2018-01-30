
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { SharedModule } from '../shared/shared.module';
import { MAIN_MODULE_COMPONENTS } from './components';
import { MAIN_VIEW_ROUTES } from './routes';
import { MAIN_MODULE_CUSTOM_COMPONENTS } from './components/index';

@NgModule({
  declarations: [
    MAIN_MODULE_COMPONENTS,
    MAIN_MODULE_CUSTOM_COMPONENTS
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MAIN_VIEW_ROUTES),
    VirtualScrollModule
  ],
})
export class MainModuleViewComponent {
}
