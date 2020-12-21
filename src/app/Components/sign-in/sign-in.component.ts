import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { StagiereService } from 'src/app/Services/stagiere.service';
import * as firebase from 'firebase';
import { Stagiere } from 'src/app/Interfaces/stagiere.interface';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  MessagError: string
  db = firebase.firestore();
  stagieres: Stagiere [] = []
  stagiereObservable: Subscription
  Myemail;
  isEmailExist;
  ErrorPassword;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ss: StagiereService,
    private fs: AngularFirestore) { }

  onFindUid(mail){    
   this.db.collection('Users').where('Email' ,'==', mail).get()
   .then((queryDoc) => {
      queryDoc.docs.forEach((document) => {
        if (document.data().Role == 'stagiere')
        this.router.navigate(['/sign-in','profileStagiere', document.data().id]);
        else
        this.router.navigate(['/sign-in','profileAdmin', document.id]);
      });
  })
  .catch((error) => {
    console.log(`Error getting documents: ${error}`);
  });
    }
    
    onForGotPassWord() {
      var auth = firebase.auth();
      if(this.Myemail){
        auth.sendPasswordResetEmail(this.Myemail)
        .then(() =>alert("Un email pour reinitialiser votre mot de pass a été envoyer au votre boite mail "))
      .catch((error) => alert(error.message))
      }

    if(!this.Myemail)
      alert('Merci de saisir votre email dans le champs Email');
    }
    

    
    OnLogin() {
      const email = this.signInForm.get('email').value;
      const password = this.signInForm.get('password').value;
      
       this.authService.SignIn(email, password).then(
         () => {
           this.onFindUid(email);
               },
         (error) => {
           this.MessagError = error;
         }
       );
    }
 
    initializForm(){
      //pour configurer le formGroup
      this.signInForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      });
    }

  ngOnInit() {
   // this.email = this.signInForm.value('email');
   // console.log(this.email);
    this.initializForm();
  }
 
}