
//components
import { LoadingButton} from './loading-button/loading-button.component';
import { LoadingButtonBusyComponent} from './loading-button/busy/busy.component';
import { LoadingButtonReady} from './loading-button/ready/ready.component';
import { CheckAnimationComponent } from './check-animation/check-animation.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { CompletedSnackbarComponent } from './snackbar-status/types/completed/snackbar-completed.component';
import { ProgressSnackbarComponent } from './snackbar-status/types/progress/snackbar-progress.component';
import { JsonFormComponent } from './json-form/json-form.component';
import { QuillEditorComponent } from './ngx-quill/quill-editor.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormlyStepperComponent } from './formly-stepper/formly-stepper.component';
import { SsnInputComponet  } from './snn-input/ssn-input.component';
import { ImageUploadComponent } from './img-upload/img-upload.component';
import { ImageRioLoader } from './image-resize-io-loader/image-rio-loader.component';

//providers
import { SnackbarStatusService } from './snackbar-status/service/snackbar-status.service';

export function CUSTOM_COMPONENTS() {
  return [
    LoadingButton,
    LoadingButtonBusyComponent,
    LoadingButtonReady,
    CheckAnimationComponent,
    LoadingPanelComponent,
    CompletedSnackbarComponent,
    ProgressSnackbarComponent,
    JsonFormComponent,
    QuillEditorComponent,
    FormBuilderComponent,
    FormlyStepperComponent,
    SsnInputComponet,
    ImageUploadComponent,
    ImageRioLoader
  ]

}

//export const CUSTOM_COMPONENTS = [

//  LoadingButton,
//  LoadingButtonBusyComponent,
//  LoadingButtonReady,
//  CheckAnimationComponent,
//  LoadingPanelComponent,

//  CompletedSnackbarComponent,
//  ProgressSnackbarComponent,
//  JsonFormComponent,
//  QuillEditorComponent,
//  FormBuilderComponent,
//  FormlyStepperComponent,
//  SsnInputComponet,
//  ImageUploadComponent,
//  ImageRioLoader
 
  

// ];


export function CUSTOM_PROVIDERS() {
  return [
    SnackbarStatusService
  ]
}

//export const CUSTOM_PROVIDERS = [
//    SnackbarStatusService
//  ]
