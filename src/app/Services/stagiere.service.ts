import { Injectable } from '@angular/core';
import { Stagiere } from '../Interfaces/stagiere.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class StagiereService {

  stagieres: Stagiere [] = [];

  getAllStagieres(){
    return this.fs.collection('Stagieres').snapshotChanges();
    
  }

  addNewStagiere(NomComplet: string, Periode:string, PhoneNumber: string, Email: string, Presentation: string, CV: string,
    LM: string  ){
    this.fs.collection('Stagieres').add({
    status :'false',
    NomComplet,
    Email,
    PhoneNumber,
    Presentation,
    Periode,
    CV,
    LM

    })
    
  }
  removeStagiereFile(CVV: string, LMM: string) {
    const CV = firebase.storage().refFromURL(CVV);
    CV.delete().then(
       () => {
         console.log('CV removed!');
       },
       (error) => {
         console.log('Could not remove CV! : ' + error);
       }
     );
    const LM = firebase.storage().refFromURL(LMM);
    LM.delete().then(
       () => {
         console.log('LM removed!');
       },
       (error) => {
         console.log('Could not remove LM! : ' + error);
       }
     );
 
    
   }
 
  uploadFileCV(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('MesCv/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement CV …');
          },
          (error) => {
            console.log('Erreur de chargement CV ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
  
  uploadFileLM(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('MesLm/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement LM …');
          },
          (error) => {
            console.log('Erreur de chargement LM ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }


  constructor(private fs: AngularFirestore) { }
}
