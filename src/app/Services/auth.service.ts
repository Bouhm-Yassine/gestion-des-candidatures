import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private afAuth: AngularFireAuth, private fs: AngularFirestore, private us: UserService,
  private  router: Router) {}

  db = firebase.firestore();

  SignIn(email:string, password: string){
    return new Promise(
      (resolve, reject) =>  {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          
          (data) => {
            resolve();
          } ,
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  config = 
    {
    apiKey: "AIzaSyASrbLmzLCyCHqDVk8tbGU3ynEzidunvsg",
    authDomain: "stagiererh.firebaseapp.com",
    databaseURL: "https://stagiererh.firebaseio.com"
  };

  secondaryApp = firebase.initializeApp(this.config, "Secondary");

  LogIn(email:string, password: string, uid: string){
    //pour faire une methode a sync
    return new Promise(
      (resolve, reject) =>  {
        this.secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(
          (firebaseUser) => {
            this.us.addNewStagiereUser(uid, email, firebaseUser.user.uid);
            this.secondaryApp.auth().signOut();
            resolve();
          } ,
          (error) => {
            reject(error);
          }
        );
      }
    );
  }



  SignOut(){
    firebase.auth().signOut();
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("Un email pour reinitialiser votre mot de pass a été envoyer au votre boite mail "))
      .catch((error) => console.log(error))
  }

}
