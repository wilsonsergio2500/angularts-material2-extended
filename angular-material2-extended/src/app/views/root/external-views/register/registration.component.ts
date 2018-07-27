
import { Component, OnDestroy } from '@angular/core';
import { FormlyGroup } from '../../../../fomly-fields/FormlyGroup';
import { Fields } from '../../../../fomly-fields/Fields';
import { IFormlyGroup } from '../../../../fomly-fields/IFormlyGroup';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IUserModel } from '../../../../models/user/IUserModel';

import { FormlyStepper, IFormlyStepper, IFormlyStepperItem } from '../../../../components/formly-stepper/models/FormlyStepper';
import { GetSetpCredFiels } from './steps/step-credentials';
import { StepBio } from './steps/step-bio';

import { EMPTY_IMAGES_DISPLAY } from '../../../../components/img-upload/utils/empty-images-displays';
import { ImageResizerIO } from '../../shared/services/image-resizer-io/ImageResizerIO.service';
import { FirebaseUserService } from '../../shared/services/firebase/user/user.service';
import {SnackbarStatusService } from '../../../../components/snackbar-status/service/snackbar-status.service';

const PasswordAllowedLength = 8;

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: [
    'registration.component.css'
  ]
})
export class RegistrationComponent implements OnDestroy {

  working: boolean;
  insertFired: boolean = false;

 
  get personalInfoFields() {
    const pattern = /[^a-zA-Z\-0-9]+/;
    const firstName = new Fields.InputField('firstName', 'First Name', true);
    const lastName = new Fields.InputField('lastName', 'Last Name', true);
    const valid = {
      expression: (fg: FormGroup) => {
        return (!!fg.value) ? !pattern.test(fg.value) : true;
      },
      message: (error, field: FormlyFieldConfig) => {
        return `${field.templateOptions.label} has an ilegal character`;
      }
    }
    firstName.validators = { valid };
    lastName.validators = { valid };
    return [
      firstName, lastName
    ];
  }
  get credentialsFields(){
    const PasswordAllowedLength = 8;
    const email = new Fields.EmailField('email', 'Email', true);
    email.modelOptions = {
      debounce: { default: 250}
    }
    email.asyncValidators = {
      exist: {
        expression: (fg: FormGroup) => {
          return new Promise((resolve, reject) => {
            //only do if valid
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const valid = regex.test(fg.value);
            if (valid) {
              this.firebaseUserService.IsEmailUse(fg.value).then((response) => {
                resolve(!response);
              })
            } else {
              resolve(true);
            }
          })
        },
        message: (error, field: FormlyFieldConfig) => {
          return `${field.formControl.value} account already exist`;
        }
      }
    };

    const password = new Fields.PasswordField('password', 'Password');
    password.validators = {
      'lengthallowed': {
        expression: (fg: FormGroup) => {
          return (!!fg.value) && ((fg.value as string).length >= PasswordAllowedLength);
        },
        message: (error, field: FormlyFieldConfig) => {
          return `${field.templateOptions.label} has an invalid length`;
        }
      }
    }
    const passwordConfirmation = new Fields.PasswordField('passwordconfirm', 'Password Confirmation');
    passwordConfirmation.validators = {
      'match': {
        expression: (fg: FormGroup) => {
          return fg.value === this.Forms.Model.password;
        },
        message: (g: any, p: FormlyFieldConfig) => {
          return `Password must match the above`;
        }
      }
    };

    return [
      email, password, passwordConfirmation
    ]

  }
  get imageUploadField(){
    const imageUpload = new Fields.UploadImageField('image', 'Profile Image', EMPTY_IMAGES_DISPLAY.PROFILE);
    imageUpload.templateOptions.uploaderImage.previewFlexSize = 30;
    imageUpload.templateOptions.uploaderImage.aspectRatioWidth = 1;
    imageUpload.templateOptions.uploaderImage.aspectRatioHeight = 1;
    imageUpload.templateOptions.uploaderImage.thumbnailWidth = 210;
    imageUpload.templateOptions.uploaderImage.thumbnailHeight = 210;
    imageUpload.templateOptions.uploaderImage.title = 'Upload Image'
    return [imageUpload];

  }

  Forms: IFormlyStepper<IUserModel> = new FormlyStepper<IUserModel>([
    <IFormlyStepperItem>{ Label: 'Step 1', Fields: this.credentialsFields },
    <IFormlyStepperItem>{ Label: 'Step 2', Fields: this.imageUploadField },
    <IFormlyStepperItem>{ Label: 'Step 4', Fields: this.personalInfoFields},
    <IFormlyStepperItem>{ Label: 'Step 3', Fields: StepBio },
    
  ])


  
  constructor(private imageResizeIoService: ImageResizerIO, private firebaseUserService: FirebaseUserService,
              private snackbarStatusService: SnackbarStatusService) {
    this.working = false;
    window.addEventListener("beforeunload", this.OnBrowserDestroy.bind(this));
 
  }

  formSubmit(model: any) {
    this.insertFired = true;
    this.working = true;

    this.firebaseUserService.CreateUser(this.Forms.Model).then(() => {
      this.snackbarStatusService.OpenComplete('Account has been created', 5000);
    });



  }

  ngOnDestroy(): void {
    window.removeEventListener("beforeunload", this.OnBrowserDestroy);
  }

  OnBrowserDestroy(): void {
    if (this.insertFired == false && this.Forms.Model.image != EMPTY_IMAGES_DISPLAY.PROFILE) {
      this.imageResizeIoService.Delete(this.Forms.Model.image);
    }
    
  }

}
