
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EXTERNAL_VIEWS_COMPONENTS } from './components';
import { EXTERNAL_VIEW_ROUTES } from './routes';


@NgModule({
  declarations: [EXTERNAL_VIEWS_COMPONENTS],
  imports: [
    RouterModule.forChild(EXTERNAL_VIEW_ROUTES)
  ],
  exports : []
})
export class ExternalViewModule {

}
