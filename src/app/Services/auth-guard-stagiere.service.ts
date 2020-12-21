import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardStagiereService {
  db = firebase.firestore();
  
  constructor(private router: Router, private as: AuthService) { }

  isStagiereLoggedIn(idStagiere){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.db.collection('Users').where('id' ,'==', idStagiere)
              .get().then((queryDoc) => 
              {queryDoc.docs.forEach((document) => {
              if(document.data().UidUser !== user.uid)
              {
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