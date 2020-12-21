import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/auth.service';
import { AuthGuardAdminService } from 'src/app/Services/auth-guard-admin.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  idAdmin;
  db=firebase.firestore();
  isAdmin :  boolean = true;
  isStagiere: boolean = false;
  isEmployee: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private as: AuthService,
    private agas:  AuthGuardAdminService) { }


  ngOnInit() {
    this.agas.isAdminLoggedIn(this.route.snapshot.params['idAdmin']); 
    this.idAdmin = this.route.snapshot.params['idAdmin'];
  }

  onGoStagiere(){
    this.isStagiere = true;
    this.isEmployee = false;
    this.isAdmin = false;
    //this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmin,'listStagiere']);
  }
  onGoEmployee(){
    this.isEmployee = true;
    this.isStagiere = false;
    this.isAdmin = false;
    //this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmin,'employee']);
  }
  onGoAdmin(){
    this.isAdmin = true;
    this.isStagiere = false;
    this.isEmployee = false;
  }

}
