import { Component, OnInit,ElementRef } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import { Router }from '@angular/router';
//imports services
import { Aes256Service } from '../services/AES-256/aes-256.service';
import { MessagesService } from '../services/Messages/messages.service';
import { FirebaseService } from '../services/Firebase/firebase.service';
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {
  pass:any = {};
  mensaje:any = {};
  private datos: FormGroup;
  private showPassword:boolean=false;
  private passwordToggleIcon:string='eye';
  constructor(private router:Router,private fire:FirebaseService,private formBuilder: FormBuilder,private message_:MessagesService,private aes256:Aes256Service,private elementRef:ElementRef,private toastCtrl:ToastController) {
    this.datos = this.formBuilder.group({
      'nombre': new FormControl('',[Validators.required]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]{8,18}$/)]),
      'passwordC': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]{8,18}$/)]),
      'celular':new FormControl('', [Validators.required,Validators.pattern(/^[0-9_-]{10,12}$/)]),
    });
  }
  ngOnInit() {

  }
  redirect_login(){
    this.router.navigate(['/login']);       
  }  
  private async message(idM){
    if(idM==1){
      const message = await this.toastCtrl.create({
        message: 'Escriba su nombre o uno de los dos nombres solamente.',
        duration: 2000,
        position:'top',
      });
      message.present().then(() => {
        const inputElement = this.elementRef.nativeElement.getElementsByTagName('input')[0];
        inputElement.focus();
      });
    }
    else if(idM==2){
      const message = await this.toastCtrl.create({
        message: 'Escriba sus apellidos de máximo 25 letras',
        duration: 2000,
        position:'top',
      });
      message.present().then(() => {
        const inputElement = this.elementRef.nativeElement.getElementsByTagName('input')[1];
        inputElement.focus();
      });
    }
    else if(idM==3){
      const message = await this.toastCtrl.create({
        message: 'Escriba su correo el @ es olbigatorio.',
        duration: 2000,
        position:'top',
      });
      message.present().then(() => {
        const inputElement = this.elementRef.nativeElement.getElementsByTagName('input')[2];
        inputElement.focus();
      });
    }
    else if(idM==4){
      const message = await this.toastCtrl.create({
        message: 'Contraseña de 8 a 18 números o letras.',
        duration: 2000,
        position:'top',
      });
      message.present().then(() => {
        const inputElement = this.elementRef.nativeElement.getElementsByTagName('input')[3];
        inputElement.focus();
      }); 
    }
    else if(idM==5){
      const message = await this.toastCtrl.create({
        message: 'Escriba la misma contraseña anteriormente puesta.',
        duration: 2000,
        position:'top',
      });
      message.present().then(() => {
        const inputElement = this.elementRef.nativeElement.getElementsByTagName('input')[4];
        inputElement.focus();
      });
    }

    else if(idM==6){
      const message = await this.toastCtrl.create({
        message: 'teléfono celular de 10 digitos',
        duration: 2000,
        position:'top',
      });
      message.present().then(() => {
        const inputElement = this.elementRef.nativeElement.getElementsByTagName('input')[5];
        inputElement.focus();
      });
    }     
  }
  private async check_in(){
    if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.celular!=''){
    if(this.datos.value.password!=''&&this.datos.value.passwordC!=''){
      this.message_.loading();
      if(this.datos.value.password===this.datos.value.passwordC){
        //var pass=this.aes256.encrypt(this.datos.value.password);
        let body={idRole:'GJyQ584yKSNiSq9DTpkY',name:this.datos.value.nombre,lastname:this.datos.value.apellido,email:this.datos.value.correo,phone:this.datos.value.celular,img_client:''};
        await this.fire.comparemail_phone(body).then(async(res)=>{
          if(res==true){   
            await this.fire.check_in(body,this.datos.value.password).then((res)=>{
              this.message_.successfull_checkIn();
              this.redirect_login();
            }).catch((err)=>{
              this.message_.error_email();
              this.message_.dismiss_loding();

            });
          }
          else{
            this.message_.error_email();
          }
          this.message_.dismiss_loding();
        });
      }
      else{
        this.message_.dismiss_loding();
        this.message_.error_passConfirm();
      }
    }}
  }
  private togglePassword():void{
    this.showPassword=!this.showPassword;
    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon='eye-off';
    }
    else{
      this.passwordToggleIcon='eye';
    }
  }
}
