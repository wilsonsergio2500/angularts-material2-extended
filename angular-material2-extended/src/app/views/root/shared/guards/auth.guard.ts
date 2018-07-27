import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

    const map$ = map((auth: User) => !!auth);

    return this.firebaseAuth.authState.pipe(map$)
      .do((IsAuth: boolean) => {
        if (IsAuth) {
          
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }

      });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const map$ = map((auth: User) => !!auth);

    return this.firebaseAuth.authState.pipe(map$)
      .do((IsAuth: boolean) => {
        if (IsAuth) {
          console.log('guard')
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }

      });
  }

}
