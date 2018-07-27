
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserEntity } from '../../shared/services/firebase/schema/FirebaseDbSchema';

@Component({
  selector: 'email-confirmation',
  templateUrl: 'email.comfirmation.component.html',
  styleUrls: ['email.comfirmation.component.css']
  
})
export class EmailConfimationComponent {

  user: IUserEntity; 
  constructor(private route : ActivatedRoute) {

    this.user = this.route.snapshot.data.user as IUserEntity;
  }
}
