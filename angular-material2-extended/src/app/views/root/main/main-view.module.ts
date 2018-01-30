
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { MAIN_MODULE_COMPONENTS } from './components';
import { MAIN_VIEW_ROUTES } from './routes';

@NgModule({
  declarations: [
    MAIN_MODULE_COMPONENTS
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MAIN_VIEW_ROUTES)
  ],
})
export class MainModuleViewComponent {
}
