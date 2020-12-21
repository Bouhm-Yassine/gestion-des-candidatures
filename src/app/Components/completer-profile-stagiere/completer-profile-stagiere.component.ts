import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardStagiereService } from 'src/app/Services/auth-guard-stagiere.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterProfileStagiereService } from 'src/app/Services/completer-profile-stagiere.service';

@Component({
  selector: 'app-completer-profile-stagiere',
  templateUrl: './completer-profile-stagiere.component.html',
  styleUrls: ['./completer-profile-stagiere.component.css']
})
export class CompleterProfileStagiereComponent implements OnInit {
  fileUrlCinAvant: string;
  fileIsUploadingCinAvant = false;
  fileUploadedCinAvant = false;

  fileUrlCinArriere: string;
  fileIsUploadingCinArriere = false;
  fileUploadedCinArriere = false;

  fileUrlDiplome1: string;
  fileIsUploadingDiplome1 = false;
  fileUploadedDiplome1 = false;

  fileUrlDiplome2: string;
  fileIsUploadingDiplome2 = false;
  fileUploadedDiplome2 = false;

  CompleterProfileForm: FormGroup;
  idStagiere;
  
  

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private cpss: CompleterProfileStagiereService, private agss: AuthGuardStagiereService) { }
  
  ngOnInit() {
    this.initializForm();
    this.agss.isStagiereLoggedIn(this.route.snapshot.params['idStagiere']);
    this.idStagiere = this.route.snapshot.params['idStagiere'];
  }
  initializForm(){
    //pour configurer le formGroup
    this.CompleterProfileForm = this.formBuilder.group({
      cinAvant:['', [Validators.required]],
      cinArriere:['', [Validators.required]],
      diplome1:['', [Validators.required]],
      diplome2: ['', [Validators.required]],
      });
  }
  onUploadCinAvant(file: File) {
    this.fileIsUploadingCinAvant = true;
    this.cpss.uploadFileCINAVANT(file).then(
      (url: string) => {
        this.fileUrlCinAvant = url;
        this.fileIsUploadingCinAvant = false;
        this.fileUploadedCinAvant = true;
      }
    );
  }
  detectFilesCinAvant(event) {
    this.onUploadCinAvant(event.target.files[0]);
  }
  onUploadCinArriere(file: File) {
    this.fileIsUploadingCinArriere = true;
    this.cpss.uploadFileCINARRIERE(file).then(
      (url: string) => {
        this.fileUrlCinArriere = url;
        this.fileIsUploadingCinArriere = false;
        this.fileUploadedCinArriere = true;
      }
    );
  }
  detectFilesCinArriere(event) {
    this.onUploadCinArriere(event.target.files[0]);
  }
  onUploadDiplome1(file: File) {
    this.fileIsUploadingDiplome1 = true;
    this.cpss.uploadFileDiplome1(file).then(
      (url: string) => {
        this.fileUrlDiplome1 = url;
        this.fileIsUploadingDiplome1 = false;
        this.fileUploadedDiplome1 = true;
      }
    );
  }
  detectFilesDiplome1(event) {
    this.onUploadDiplome1(event.target.files[0]);
  }
  onUploadDiplome2(file: File) {
    this.fileIsUploadingDiplome2 = true;
    this.cpss.uploadFileDiplome2(file).then(
      (url: string) => {
        this.fileUrlDiplome2 = url;
        this.fileIsUploadingDiplome2 = false;
        this.fileUploadedDiplome2 = true;
      }
    );
  }
  detectFilesDiplome2(event) {
    this.onUploadDiplome2(event.target.files[0]);
  }
  
  CompleterProfileStagiere(){
    const cinAvant = this.fileUrlCinAvant;
    const cinArriere = this.fileUrlCinArriere;
    const diplome1 = this.fileUrlDiplome1;
    const diplome2 = this.fileUrlDiplome2;
    
    this.cpss.CompleterStagiere(cinAvant, cinArriere, diplome1, diplome2, this.idStagiere);
    
  }

  Onback(){
    this.router.navigate(['/sign-in', 'profileStagiere', this.idStagiere]);
  }

  

}
