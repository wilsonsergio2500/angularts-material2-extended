
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component'
import { MainComponent  } from './main/main.component';
import { ComponentsExampleComponent } from './components-example/components-example.component';
import { VanillaFormlyComponent } from './vanilla-formly/vanilla-formly.component';
import { FormlyFieldsTypesComponent } from './formly-fields/formly-fields.component';
import { FormlyLayoutComponent } from './formly-layout/fomly-layout.component';
import { FomlyLayoutTemplateComponent } from './formly-layout-template/formly-layout-template.component';
import { FormlyAsyncValidatorComponent } from './formly-async-validator/formly-async-validator.component';
import { FormlyFormViewComponent } from './formly-form-component/formly-form-component.component';
import { FormBuilderExampleComponent} from './form-builder-example/form-builder-example.component';
import { FormlyStepperExampleComponent } from './formly-stepper-example/formly-stepper-example.component';

export function DASHBOARD_ROUTES() {
  return [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: '', redirectTo: 'main', pathMatch: 'full' },
        { path: 'main', component: MainComponent },
        { path: 'components', component: ComponentsExampleComponent },
        { path: 'formlyvanilla', component: VanillaFormlyComponent },
        { path: 'formlyFieldTypes', component: FormlyFieldsTypesComponent },
        { path: 'formlylayout', component: FormlyLayoutComponent },
        { path: 'formlylayoutTemplate', component: FomlyLayoutTemplateComponent },
        { path: 'formlyAsyncValidator', component: FormlyAsyncValidatorComponent },
        { path: 'formlyFormComponent', component: FormlyFormViewComponent },
        { path: 'formlyStepper', component: FormlyStepperExampleComponent },
        { path: 'formBuilder', component: FormBuilderExampleComponent }

      ]
    }

  ]
}
