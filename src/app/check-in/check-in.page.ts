import { Component, OnInit,ElementRef } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {ToastController} from '@ionic/angular';
//imports services
import { Aes256Service } from '../services/AES-256/aes-256.service';
import { MessagesService } from '../services/Messages/messages.service';
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {
  data:any = {};
  pass:any = {};
  mensaje:any = {};
  private datos: FormGroup;
  constructor(private formBuilder: FormBuilder,private message_:MessagesService,private aes256:Aes256Service,private elementRef:ElementRef,private toastCtrl:ToastController) {
    this.datos = this.formBuilder.group({
      'nombre': new FormControl('',[Validators.required]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)]),
      'passwordC': new FormControl('', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)]),
      'celular':new FormControl('', [Validators.required,Validators.pattern(/^[0-9_-]{6,18}$/)]),
    });
  }
  ngOnInit() {

  }
  async message(idM){
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
        message: 'Contraseña de 6 a 18 números o letras.',
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
        message: 'Escriba la misma contraseña anteriormente puesta.',
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
        message: 'Escriba su correo el @ es olbigatorio.',
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
  check_in(){
    /*if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.password!=''&&this.datos.value.passwordC!=''&&this.datos.value.celular!=''){
      if(this.data.passwordC===this.data.password){
        var url = 'http://citcar.relatibyte.mx//mobile/Api/CheckRes.php';
        let pass=this.aes256.encrypt(this.datos.value.password);
        //var contra=window.btoa(this.data.password);
        //let password=aes256.init(this.data.password);
        let body=JSON.stringify({nombre:this.datos.value.nombre,apellido:this.datos.value.apellido,correo:this.datos.value.correo,pass:pass,celular:this.datos.value.celular});
        this.http.post(url,body).subscribe(res => {
          if(res===0){
            this.message_.general_error();
          }      
          else if(res===1){
            this.message_.error_email();
          }
          else{ 
            this.mensaje=res;
            //console.log(this.mensaje);
            /*let mess = this.alertCtrl.create({
              title: 'Perfecto',
              message:this.mensaje,
              buttons: ['Entendido']
            });
            mess.present();
            this.message_.successfull_checkIn();
            //this.pass=res[0].cliente_pass;
            //this.storage.set('Apodo',this.nick);
            //this.storage.set('confirmador',this.nick+this.pass);
            //console.dir(nick+','+pass);
    
          }
        },err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
      }
      else{
        this.message_.error_passConfirm();
      }
    }
    else{
      this.message_.warning_fields();
    }*/  
  }
}
