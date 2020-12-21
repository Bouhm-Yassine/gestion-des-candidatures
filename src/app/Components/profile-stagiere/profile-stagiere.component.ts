import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Stagiere } from 'src/app/Interfaces/stagiere.interface';
import { AuthService } from 'src/app/Services/auth.service';
import { AuthGuardStagiereService } from 'src/app/Services/auth-guard-stagiere.service';
import { CompleterProfileStagiereService } from 'src/app/Services/completer-profile-stagiere.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Diplome } from 'src/app/Interfaces/diplomes.interface';
import { AttestationStatus } from 'src/app/Interfaces/AttestationStatus.interface';

@Component({
  selector: 'app-profile-stagiere',
  templateUrl: './profile-stagiere.component.html',
  styleUrls: ['./profile-stagiere.component.css']
})
export class ProfileStagiereComponent implements OnInit {
  myDataAttestationStatus: AttestationStatus[]=[];
  idStagiere;
  db = firebase.firestore();
  CompleterStagierestatus;
  AttesationStatiereStatus;
  myDataDiplome: Diplome[]=[];
  isProfile: boolean=true;
  isChangerPassword: boolean=false;
  isAttestation: boolean=false;
  isCompleterProfile: boolean=false;

  onGoAttestation(){
    this.isAttestation = true;
    this.isChangerPassword = false;
    this.isProfile = false;
    this.isCompleterProfile=false;
  }
  onGoProfile(){
    this.isProfile = true;
    this.isAttestation = false;
    this.isChangerPassword = false;
    this.isCompleterProfile=false;
  }
  onGoChangerPassword(){
    this.isProfile = false;
    this.isAttestation = false;
    this.isChangerPassword = true;
    this.isCompleterProfile=false;
  }
  onGoCompleterProfileStagiere(){
    this.isCompleterProfile=true;
    this.isProfile = false;
    this.isAttestation = false;
    this.isChangerPassword = false;

  }
  getStagiereAttestationStatus(){
    this.fs.collection('Stagieres').doc(this.idStagiere).collection('Attestation').snapshotChanges()
     .subscribe(diplome => {
       this.myDataAttestationStatus = diplome.map(AttestationStatus => {
         return {
           ...AttestationStatus.payload.doc.data()
         }
       })
     })
   }
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
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
    private agss: AuthGuardStagiereService, private cpss: CompleterProfileStagiereService, private fs: AngularFirestore) { }

    OnDemandeAttestation(){
      this.cpss.DemandeAttestationStagiere(this.idStagiere);
    }

  getProfileStagiere() {
    this.db.collection('Stagieres').doc(this.idStagiere).get().then((document) => {
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
   
    getCompleterProfileStagiereStatus() {
      this.db.collection('Stagieres').doc(this.idStagiere).collection('Diplomes').doc(this.idStagiere).get().then((document) => {
        const data = document.data();
        
        this.CompleterStagierestatus = data.status
        //console.log(data);
  })
   .catch((error) => {
     console.log(`Error getting documents: ${error}`);
   });
   }
   
   getDetailStagiereDiplomes() {
    this.fs.collection('Stagieres').doc(this.idStagiere).collection('Diplomes').snapshotChanges()
    .subscribe(diplome => {
      this.myDataDiplome = diplome.map(SingleDiplome => {
        return {
          ...SingleDiplome.payload.doc.data()
        }
      })
    })
 
      } 

  ngOnInit() {
    this.agss.isStagiereLoggedIn(this.route.snapshot.params['idStagiere']);
    this.idStagiere = this.route.snapshot.params['idStagiere'];
    console.log('idStagiere from route: '+ this.idStagiere);
    this.getProfileStagiere();
    this.getCompleterProfileStagiereStatus();
    this.getDetailStagiereDiplomes() ;
    this.getStagiereAttestationStatus();
  }
  
  onLogOut(){
    this.authService.SignOut();
    this.router.navigate(['/sign-in']);
  }

  resetPassword(email: string) {
    this.authService.resetPassword(email)
    alert('Un email pour reinitialiser votre mot de pass a été envoyer au votre boite mail ');
  }

}
