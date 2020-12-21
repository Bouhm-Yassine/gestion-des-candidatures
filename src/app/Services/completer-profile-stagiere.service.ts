import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompleterProfileStagiereService {

  constructor(private fs: AngularFirestore) { }

  CompleterStagiere(cinAvant: string, cinArriere: string, diplome1: string, diplome2: string, idStagiere: string){
  this.fs.collection('Stagieres').doc(idStagiere).collection('Diplomes').doc(idStagiere).set({
    cinAvant,
    cinArriere,
    diplome1,
    diplome2,
    status: 'false'
  })
  }

  DemandeAttestationStagiere(idStagiere: string){
    this.fs.collection('Stagieres').doc(idStagiere).collection('Attestation').doc(idStagiere).update({
      status: 'true'
    })
    }
  

  uploadFileCINAVANT(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child( 'MesCin/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement Cin Avant ...');
          },
          (error) => {
            console.log('Erreur de chargement Cin Arriere !!! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
  uploadFileCINARRIERE(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child( 'MesCin/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement Cin Arriere...');
          },
          (error) => {
            console.log('Erreur de chargement Cin Arriere !!! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
  uploadFileDiplome1(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child( 'MesDiplomes/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement Diplome 1...');
          },
          (error) => {
            console.log('Erreur de chargement Diplome 1 !!! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
  uploadFileDiplome2(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child( 'MesDiplomes/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement Diplome 2...');
          },
          (error) => {
            console.log('Erreur de chargement Diplome 2 !!! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
