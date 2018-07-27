
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EXTERNAL_VIEWS_COMPONENTS } from './components';
import { EXTERNAL_VIEW_ROUTES } from './routes';
import { SharedModule } from '../shared/shared.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { GetExternalViewProviders } from './services'

const Providers = [
  ...GetExternalViewProviders()
]

@NgModule({
  declarations: [EXTERNAL_VIEWS_COMPONENTS()],
  providers: [...Providers],
  imports: [
    RouterModule.forChild(EXTERNAL_VIEW_ROUTES),
    SharedModule.forRoot()
  ],
  exports: []
})
export class ExternalViewModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ExternalViewModule,
      providers: [...Providers]
    };
  }
}
