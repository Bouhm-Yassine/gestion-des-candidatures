import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StagiereService } from 'src/app/Services/stagiere.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {


  fileUrlCV: string;
  fileIsUploadingCV = false;
  fileUploadedCV = false;

  fileUrlLM: string;
  fileIsUploadingLM = false;
  fileUploadedLM = false;

  candidatureForm: FormGroup;
  isValider = true;
  

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private stagiereService: StagiereService) { }

  ngOnInit() {
    this.initializForm();
  }

  initializForm(){
    //pour configurer le formGroup
    this.candidatureForm = this.formBuilder.group({
      nomcomplet:['', [Validators.required]],
      periode:['', [Validators.required]],
      tlf:['', [Validators.required, Validators.pattern(/^[0]{1}[567]{1}[0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      presentation:['', [Validators.required, Validators.maxLength(150)]],
      cv: ['', [Validators.required]],
      lm:['', [Validators.required]],

     });
  }

  addStagiere(){
    const nomcomplet = this.candidatureForm.get('nomcomplet').value;
    const periode = this.candidatureForm.get('periode').value;
    const tlf = this.candidatureForm.get('tlf').value;
    const email = this.candidatureForm.get('email').value;
    const presentation = this.candidatureForm.get('presentation').value;
    const cv = this.fileUrlCV;
    const lm = this.fileUrlLM;
   

    this.stagiereService.addNewStagiere(nomcomplet, periode, tlf, email, presentation, cv, lm);

    this.isValider = false;
  }

  detectFilesCV(event) {
    this.onUploadCV(event.target.files[0]);
  }

  detectFilesLM(event) {
    this.onUploadLM(event.target.files[0]);
  }
  onUploadCV(file: File) {
    this.fileIsUploadingCV = true;
    this.stagiereService.uploadFileCV(file).then(
      (url: string) => {
        this.fileUrlCV = url;
        this.fileIsUploadingCV = false;
        this.fileUploadedCV = true;
      }
    );
  }
  onUploadLM(file: File) {
    this.fileIsUploadingLM = true;
    this.stagiereService.uploadFileLM(file).then(
      (url: string) => {
        this.fileUrlLM = url;
        this.fileIsUploadingLM = false;
        this.fileUploadedLM = true;
      }
    );
  }

}
