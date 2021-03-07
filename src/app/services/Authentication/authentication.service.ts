import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //private authState:boolean= false;
  constructor(private afAuth: AngularFireAuth) { 
  }
  public async registerUser(correo,password) {
    await new Promise<any>((resolve,reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(correo,password).then(res =>{ 
        resolve(res);
      }).catch((err)=>{
        reject(err);
      });
    });
  }
  public async loginUser(value) {
    await new Promise<any>((resolve,reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.correo,value.password).then(res => {
        resolve(res);
      }).catch((err)=>{
        reject(err);
      })
    }); 
  }
  public async logoutUser() {
    return await new Promise((resolve, reject) => {
      if (this.afAuth.auth.currentUser) {
        this.afAuth.auth.signOut().then(() => {
            resolve(true);
          }).catch((error) => {
            reject();
          });
      }
    })
  }
  public async updateUser(email:string){
    //this.afAuth.auth.confirmPasswordReset();
    await new Promise<any>((resolve,reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email).then(res =>{ 
        resolve(res);
      }).catch((err)=>{
        reject(err);
      });
    });
    this.afAuth.auth.sendPasswordResetEmail
  }
  private userDetails() {
    return this.afAuth.user;
  }
}
