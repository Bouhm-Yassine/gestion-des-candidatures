import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  db = firebase.firestore();
  constructor(private fs: AngularFirestore) { }


  addNewStagiereUser(id: string, Email: string, Uid: string){
    this.fs.doc('Users/'+ id).set({
      id: id,
      Email: Email,
      Role: 'stagiere',
      UidUser: Uid
    })
  }

  onDeleteStagiere(id: string) {
    //console.log(id);
    this.fs.collection('Users').doc(id).delete();
   }
}
