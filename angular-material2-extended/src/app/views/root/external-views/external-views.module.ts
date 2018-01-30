
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EXTERNAL_VIEWS_COMPONENTS } from './components';
import { EXTERNAL_VIEW_ROUTES } from './routes';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EXTERNAL_VIEWS_COMPONENTS],
  imports: [
    RouterModule.forChild(EXTERNAL_VIEW_ROUTES),
    SharedModule
  ],
  exports : []
})
export class ExternalViewModule {

}
