import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //private authState:boolean= false;
  constructor(private afAuth: AngularFireAuth) { 
  }
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.correo, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
  }
  async loginUser(value) {
    await new Promise<any>((resolve,reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.correo,value.password).then(res => {
          resolve(res);
      }).catch((err)=>{
        console.log(err);
        reject(err);
      })
    }); 
  }
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        this.afAuth.auth.signOut().then(() => {
            console.log("LOG Out");
            resolve(true);
          }).catch((error) => {
            reject();
          });
      }
    })
  }
  userDetails() {
    return this.afAuth.user;
  }
}
