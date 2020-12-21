import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {
  constructor(private router: Router, private as: AuthService) { }
db = firebase.firestore();

  isAdminLoggedIn(idAdmin){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.db.collection('Users').where('id' ,'==', idAdmin)
              .get().then((queryDoc) => 
              {queryDoc.docs.forEach((document) => {
              if(document.data().UidUser !== user.uid){
                this.router.navigate(['/sign-in']);
                this.as.SignOut();
              }
                      });})
              .catch((error) => {
              console.log(`Error getting documents: ${error}`);
              });
            
            } else {
              this.router.navigate(['/sign-in']);
            }
          }
        );
      }
    );
      }


  
}
