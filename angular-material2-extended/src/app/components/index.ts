
//components
import { LoadingButton} from './loading-button/loading-button.component';
import { LoadingButtonBusyComponent} from './loading-button/busy/busy.component';
import { LoadingButtonReady} from './loading-button/ready/ready.component';
import { CheckAnimationComponent } from './check-animation/check-animation.component';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component'
import { CompletedSnackbarComponent } from './snackbar-status/types/completed/snackbar-completed.component';
import { ProgressSnackbarComponent } from './snackbar-status/types/progress/snackbar-progress.component'
//providers
import { SnackbarStatusService } from './snackbar-status/service/snackbar-status.service'

export const CUSTOM_COMPONENTS = [

  LoadingButton,
  LoadingButtonBusyComponent,
  LoadingButtonReady,
  CheckAnimationComponent,
  LoadingPanelComponent,

  CompletedSnackbarComponent,
  ProgressSnackbarComponent

 ];



export const CUSTOM_PROVIDERS = [
    SnackbarStatusService
  ]
