import { Component, OnInit,ElementRef } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {ToastController,LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Aes256Service } from '../services/AES-256/aes-256.service';

//imports services
import { MessagesService } from '../services/Messages/messages.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordO:any={};
  celular: any={};
  data:    any={};
  correoO: any={};
  correo:  any={};
  pass:    any={};
  mensaje: any={};
  private datos: FormGroup;
  private isLoading = false;
  constructor(private aes256:Aes256Service,private loadingCtrl:LoadingController,private storage:Storage,private formBuilder: FormBuilder,private message_:MessagesService,private elementRef:ElementRef,private toastCtrl:ToastController) {
    this.datos = this.formBuilder.group({
      'passwordOld': new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9_-]{7,18}$/)]),
      'password': new FormControl('', [Validators.required,Validators.pattern(/^[a-z0-9_-]{7,18}$/)]),
      'passwordC': new FormControl('', [Validators.required,Validators.pattern(/^[a-z0-9_-]{7,18}$/)]),
    });
  }
  ngOnInit() {
  }
  //metodos
  async loading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message:'Cargando'
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss_loding() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  /* antes que cargue la ventana hace una consulta al servidor para optener el correo y la contraseña  
  @this.passwordO{String}
   this.correo{String}
  */
  ionViewCanEnter(){
    /*this.storage.get('confirmador').then((res) => {
      if(res!=null){
            var url = 'http://citcar.relatibyte.mx//mobile/Api/ConsultP.php';
            this.correoO=res;
            //let pass=Md5.init(this.datos.value.password);;
            let body=JSON.stringify({mail: this.correoO});
            this.http.post(url,body).subscribe(res => {
              if(res===0){
                this.message_.general_error();
              }      
              else{
                this.passwordO=res[0].cliente_pass;
                this.correo=  res[0].cliente_correo;
              }
            },err => {
              /*console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);
            }); 
        }
        else{
          this.message_.warning_fields();
        }              
    });*/
  }
  /*Envia la nueva contraseña y el correo para actualizar la contraseña
  @passNew{String}
  @correo{String}
  @return res{int}
  */
  edit(){
    /*let passOld=Md5.init(this.datos.value.passwordOld);
    if(this.passwordO===passOld){
      if(this.datos.value.password!=''||this.datos.value.passwordC!='' || this.datos.value.passwordOld!=''){
          if(this.datos.value.passwordC===this.datos.value.password){
            var url = 'http://citcar.relatibyte.mx//mobile/Api/ChangePass.php';
            let passNew=Md5.init(this.datos.value.password);
            let body=JSON.stringify({pass:passNew,correo:this.correo});
            this.http.post(url,body).subscribe(res => {
              if(res===0){
                this.message_.general_error();
              }      
              else if(res===1){
                this.message_.edit_error();
              }
              else{ 
                this.mensaje=res;
                //console.log(this.mensaje);
                this.message_.successfull_edit();       
              }
            },err => {
              /*console.log('Error: ' + err.error);
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
        } 
    }
    else{
      this.message_.error_actaulPass();
    }*/
  }
}
