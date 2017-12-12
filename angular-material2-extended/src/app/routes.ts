
import { Routes } from '@angular/router';
import { HomeViewComponent } from './views/home/home.component';
import { SampleViewComponent } from './views/sample/sample.component'

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeViewComponent },
  { path: 'sample', component: SampleViewComponent}
]
