import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stagiere } from 'src/app/Interfaces/stagiere.interface';
import { StagiereService } from 'src/app/Services/stagiere.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthGuardAdminService } from 'src/app/Services/auth-guard-admin.service';
import { Diplome } from 'src/app/Interfaces/diplomes.interface';
import { Observable, Subscription } from 'rxjs';
import { AttestationStatus } from 'src/app/Interfaces/AttestationStatus.interface';

@Component({
  selector: 'app-single-stagiere',
  templateUrl: './single-stagiere.component.html',
  styleUrls: ['./single-stagiere.component.css']
})
export class SingleStagiereComponent implements OnInit {
  db = firebase.firestore();
  AttesationStagiereStatus;
  DelivrationAttesationStagiereStatus;

  constructor(private route: ActivatedRoute, private authService: AuthService, 
    private router: Router, private stagiereService: StagiereService, private fs: AngularFirestore,
    private us: UserService, private agas:  AuthGuardAdminService) { 
    }

  stagiere: Stagiere [];
  uid;
  idAdmine;
  
  myDataDiplome: Diplome[]=[];
  myDataAttestationStatus: AttestationStatus[]=[];
  public myData: Stagiere ={
    id: '', 
    status: '',
    NomComplet: '', 
    Email: '',
    PhoneNumber : '', 
    Presentation: '',
    Periode: '',
    CV: '',
    LM: '',
}

getStagiereAttestationStatus(){
  this.fs.collection('Stagieres').doc(this.uid).collection('Attestation').snapshotChanges()
   .subscribe(diplome => {
     this.myDataAttestationStatus = diplome.map(AttestationStatus => {
       return {
         ...AttestationStatus.payload.doc.data()
       }
     })
   })
 }
 onDilivrerAttestation(){
  this.db.collection('Stagieres').doc(this.uid).collection('Attestation').doc(this.uid).update({
    statusDelivration: 'true'
  })


 }
  
getDetailStagiere() {
 this.db.collection('Stagieres').doc(this.uid).get().then((document) => {
 const data = document.data();
this.myData = {
  id: data.id , 
  status: data.status,
  NomComplet: data.NomComplet, 
  Email: data.Email,
  PhoneNumber : data.PhoneNumber, 
  Presentation: data.Presentation,
  Periode: data.Periode,
  CV: data.CV,
  LM: data.LM,
}
//console.log(data);
 
})
.catch((error) => {
  console.log(`Error getting documents: ${error}`);
});
} 

 getDetailStagiereDiplomes() {
   this.fs.collection('Stagieres').doc(this.uid).collection('Diplomes').snapshotChanges()
   .subscribe(diplome => {
     this.myDataDiplome = diplome.map(SingleDiplome => {
       return {
         ...SingleDiplome.payload.doc.data()
       }
     })
   })

     } 

  ngOnInit() {
    this.agas.isAdminLoggedIn(this.route.snapshot.params['idAdmin']) ;
    const id = this.route.snapshot.params['id'];
    const idAdmin = this.route.snapshot.params['idAdmin'];
    this.uid = id;
    this.idAdmine = idAdmin;
    this.getDetailStagiere();
    this.getDetailStagiereDiplomes();
    this.getStagiereAttestationStatus();
    
}

  onBack() {
    this.router.navigate(['/sign-in', 'profileAdmin', this.idAdmine,'listStagiere']);
  }

  onValidate() {
 this.fs.collection('Stagieres').doc(this.uid).set(
  {
    id: this.uid,
    status: 'true',
    NomComplet: this.myData.NomComplet,
    Email: this.myData.Email,
    PhoneNumber: this.myData.PhoneNumber,
    Presentation:this.myData.Presentation ,
    Periode: this.myData.Periode,
    CV: this.myData.CV,
    LM: this.myData.LM
  }
)

this.fs.collection('Stagieres').doc(this.uid).collection('Diplomes').doc(this.uid).set({
  status: 'true'
})

  this.fs.collection('Stagieres').doc(this.uid).collection('Attestation').doc(this.uid).set({
    statusDelivration: 'false',
    status: 'false'
  })
    this.authService.LogIn(this.myData.Email, this.myData.Email + '123456',this.uid);
    
    //this.us.addNewStagiereUser(this.uid,this.myData.Email);

 window.alert('Bien Créer !! \n' +
       'Status = Validé\n' +
       'User: ' + this.myData.Email
      + '\nMP: ' + this.myData.Email + '123456' );
    }
}
