import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  users$: AngularFireList<any[]>;
  user$: AngularFireObject<any>;

  constructor(private fireDb: AngularFireDatabase) {

    //let t = this.fireDb.list('users').push(<any>{ user: 'gio' });
    //this.user$ =  this.fireDb.object('users');
    ////this.users$ = this.fireDb.list('users');

    //this.user$.update(<any>{ user: 'gio' });
  }
}
