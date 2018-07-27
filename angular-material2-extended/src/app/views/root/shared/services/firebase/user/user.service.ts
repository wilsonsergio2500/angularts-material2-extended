
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth';
import { IUserModel } from '../../../../../../models/user/IUserModel';
import { FriendlyUrlGenerator } from '../../../../../../utility/FriendlyUrlGenerator';
import { Base64Encoder } from '../../../../../../utility/Base64Encoder';

import { IUserEntity, IUserConnectionBaseEntity } from '../schema/FirebaseDbSchema';
import { User } from '@firebase/auth-types';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseUserService {

  constructor(private fireDb: AngularFireDatabase, private fireAuth: AngularFireAuth) {
  }

  private addUser(userId: string, user: IUserEntity) {
    const obj = this.fireDb.object(`users/${userId}`);
    return obj.set(user);
  }
  private addEmail(userId: string, user: IUserEntity) {
    const emailEncoded = Base64Encoder.Encode(user.email);
    const obj = this.fireDb.object(`emails/${emailEncoded}`);
    return obj.set(<IUserConnectionBaseEntity>{ userId });
  }

  private addFriendlyUrl(userId: string, user: IUserEntity) {
    const obj = this.fireDb.object(`friendlyurls/${user.friendlyUrlId}`);
    return obj.set(<IUserConnectionBaseEntity>{ userId });
  }

  private sendEmail(firebaseUser: User) {
    if (!firebaseUser.emailVerified) {
      return firebaseUser.sendEmailVerification();
    } else {
      return Promise.resolve(true);
    }
  }

  CreateUser(user: IUserModel) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((firebaseUser: User) => {
      
      const newUser = <IUserEntity>{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        image: {
          App: {
            value: user.image
          }
        },
        memberSince: firebase.database.ServerValue.TIMESTAMP,
        friendlyUrlId: `${user.firstName}-${user.lastName}-${FriendlyUrlGenerator.NewId()}`
        
      };
     

      const userId = firebaseUser.uid;
      return Promise.all([this.addUser(userId, newUser), this.addEmail(userId, newUser), this.addFriendlyUrl(userId, newUser), this.sendEmail(firebaseUser) ]);
    });
  }

  GetUser(userId: string) : Promise<IUserEntity> {
    return new Promise((resolve, reject) => {
      const obj = this.fireDb.object(`users/${userId}`);
      obj.query.once('value', (snap) => {
        const entity = snap.val();
        console.log(entity);
        if (!!entity) {
          resolve(entity as IUserEntity);
        } else {
          reject();
        }
      });
    });
  }

  GetCurrentUser(): Promise<IUserEntity> {
    return new Promise((resolve, reject) => {
      this.fireAuth.authState.subscribe((firebaseUser: User) => {
        this.GetUser(firebaseUser.uid).then(resolve).catch(reject);
      })
    });
  }


  IsEmailUse(email: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      const emailEncoded = Base64Encoder.Encode(email);
      const obj = this.fireDb.object(`emails/${emailEncoded}`);
      obj.query.once('value', (snap) => {
        const entity = snap.val();
        if (!!entity) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, (err) => {
        resolve(false);
        })
    });

  }

}
