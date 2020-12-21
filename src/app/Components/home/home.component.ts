import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StagiereService } from 'src/app/Services/stagiere.service';
import * as forebase from 'firebase';
import { AuthService } from 'src/app/Services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen = false;
  isStyle = false;
  isAria = true;
  getPadding(){
    if(this.isStyle === true)
    return '15px';
    else
    return '0px';
  }
  isOOpen(){
    this.isOpen = !this.isOpen;
  }
  getAria(){
    if(this.isAria === true){
      return true;
    }
    else 
    return false;
  }
  getDisplay(){
    if(this.isStyle === true){
      return 'block';
    }
    else
    return 'none';
  }
  onShow(){
    this.isOpen = true;
    this.isStyle = true;
    this.isAria = false;
  }

  constructor(private formBuilder: FormBuilder,
    private stagiereService: StagiereService, private as: AuthService, private fs: AngularFirestore) { }

   
    
  ngOnInit() {
    //this.as.isAdminLoggedIn();
  }

}
