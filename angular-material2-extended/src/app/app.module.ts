
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatInputModule, MatSelectModule, 
  MatProgressSpinnerModule, MatListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatMenuModule,
  MatStepperModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


import { ROOT_ROUTES } from './views/root/root-routes';


//components
import { AppComponent } from './app.component';
import { ROOT_COMPONENTS } from './views/root/components';
import { SharedModule } from './views/root/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ROOT_COMPONENTS,
    
  ],
  imports: [
    SharedModule.forRoot(),
    RouterModule.forRoot(ROOT_ROUTES),

  ],
  providers: [
  
    ],
  entryComponents: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
