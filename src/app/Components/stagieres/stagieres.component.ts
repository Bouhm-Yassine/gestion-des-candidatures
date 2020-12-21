import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stagiere } from 'src/app/Interfaces/stagiere.interface';
import { StagiereService } from 'src/app/Services/stagiere.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { UserService } from 'src/app/Services/user.service';
import { AuthGuardAdminService } from 'src/app/Services/auth-guard-admin.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-stagieres',
  templateUrl: './stagieres.component.html',
  styleUrls: ['./stagieres.component.css']
})
export class StagieresComponent implements OnInit, OnDestroy {

  p: Number = 1;
  count: Number = 5;

  db = firebase.firestore();
  idStagiere;

  searchTerm: string;

  isShowValide: boolean = false;
  isShowNonValide: boolean = false;
  isShowNormale: boolean = true;

  stg: Stagiere[];
  stagieres: Stagiere [] = []
  stagiereObservable: Subscription
  idAdmine;

  onShowNormale(){
    this.isShowNormale = true;
    this.isShowNonValide = false;
    this.isShowValide = false;
  }

  onShowValide(){
    this.isShowValide = true;
    this.isShowNonValide = false;
    this.isShowNormale = false;
  }
  onShowNonValide(){
    this.isShowNonValide = true;
    this.isShowValide = false;
    this.isShowNormale = false;
  }
  

  constructor(private ss: StagiereService, private route: ActivatedRoute,
    private router: Router, private fs: AngularFirestore, private us: UserService,
    private agas: AuthGuardAdminService) { }

  ngOnInit() {
    this.agas.isAdminLoggedIn(this.route.snapshot.params['idAdmin']); 
    this.stagiereObservable = this.ss.getAllStagieres().subscribe(data => {
      this.stagieres = data.map(
        element => {
          return {
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          }
          
        }
      )}
      )
      const idAdmin = this.route.snapshot.params['idAdmin'];
      this.idAdmine = idAdmin;

    }

  onBack(){
    this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmine]);
    }
  ngOnDestroy(){
    this.stagiereObservable.unsubscribe();
  }


  onViewStagiere(id){
   //console.log(id);
   this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmine,'listStagiere', 'singleStagiere', id]);
  }
  onDeleteStagiere(id: string, CV: string, LM: string) {
    console.log(id);
    this.fs.collection('Stagieres').doc(id).delete();
    this.ss.removeStagiereFile(CV,LM);
    this.us.onDeleteStagiere(id);
    
   }

}
