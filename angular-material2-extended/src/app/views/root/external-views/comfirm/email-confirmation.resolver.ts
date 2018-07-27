import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IUserEntity } from '../../shared/services/firebase/schema/FirebaseDbSchema';
import { FirebaseUserService } from '../../shared/services/firebase/user/user.service';

@Injectable()
export class EmailConfirmationResolver implements Resolve<Observable<IUserEntity>> {

  constructor(private firebaseUserService: FirebaseUserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserEntity> | Observable<Observable<IUserEntity>> | Promise<Observable<IUserEntity>>  {

    return Observable.fromPromise(this.firebaseUserService.GetCurrentUser());
  }
  
}
