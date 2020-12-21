import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  userUid;
  idAdmin;
  db = firebase.firestore();
  
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/sign-in']);
              resolve(false);
            }
          }
        );
      }
    );
  }
  

  /*
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.db.collection('Users').where('id' ,'==', route.paramMap.get('idAdmin'))
    .where('Role', '==', 'admin')
    .get()
    .then((queryDoc) => {
           queryDoc.docs.forEach((document) => {
            this.userUid = document.data().UidUser;
         });
       })
     .catch((error) => {
         console.log(`Error getting documents: ${error}`);
       });

    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
              if(user && user.uid === this.userUid) resolve(true);
              else if (user && user.uid !== this.userUid) {
              this.as.SignOut();
              this.router.navigate(['/sign-in']);
              resolve(true);
               }
              else {
              this.router.navigate(['/sign-in']);
              resolve(false);
            }
          }
        );
      }
    );
  }
  */
 /*canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  return new Promise(
    (resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            resolve(true);
          } else {
            this.router.navigate(['/auth', 'sign-in']);
            resolve(false);
          }
        }
      );
    }
  );
}
*/
  constructor(private  router: Router, private us: UserService, private as: AuthService) { }
}
