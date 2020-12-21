import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  isDash: boolean = false;
  idAdmin
  isOpen: boolean = false;
  db = firebase.firestore();

  DashPath: string;

  onDashBoard(){
    this.DashPath = "/sign-in/profileAdmin/"+ this.idAdmin;
   // this.router.navigate(['/sign-in','profileAdmin', this.idAdmin]);
  }

  constructor(private authService: AuthService, private router: Router, private as: AuthService) { }

  ngOnInit() {
    this.isAdminLoggedIn();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  isAdminLoggedIn(){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.db.collection('Users').where('Role','==','admin')
              .get().then((queryDoc) => 
              {queryDoc.docs.forEach((document) => {
              if(document.data().UidUser === user.uid){
                this.idAdmin = document.data().id;
                this.isDash = true;
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



  OnSingOut(){
    this.authService.SignOut();
    this.router.navigate(['/sign-in']);
    this.isDash = false;
  }

  onShow(){
    this.isOpen = true;
  }

}
