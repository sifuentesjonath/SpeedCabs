import { Injectable,OnInit } from '@angular/core';
//import { AES256 } from '@ionic-native/aes-256/ngx';
import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Aes256Service {
  private secureKey: string='w%Fi4qaUPAl$#7jT1gPF';
  //private secureIV: string='';
  //private aes256: AES256;
  constructor() { 
  }
  /*ionViewCanEnter(){
    this.generateSecureKeyAndIV();
  }*/

  async generateSecureKeyAndIV() {
    //this.secureKey = await this.aes256.generateSecureKey('w%Fi4qaUPAl$#7jT1gPF'); // Returns a 32 bytes string
    //this.secureIV = await this.aes256.generateSecureIV('%z8Xex#Ap%BG!fxMuFSP'); // Returns a 16 bytes string
  }
  encrypt(password:string){
    return cryptoJS.AES.encrypt(password,this.secureKey).toString();  
  }
  descrypt(password:string){
    return cryptoJS.AES.decrypt(password,this.secureKey).toString(cryptoJS.enc.Utf8); 
  }   
}
