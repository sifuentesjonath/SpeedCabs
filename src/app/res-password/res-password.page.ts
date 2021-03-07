import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router }from '@angular/router';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';

//Services
import { FirebaseService } from '../services/Firebase/firebase.service';
import { MessagesService } from '../services/Messages/messages.service';
@Component({
  selector: 'app-res-password',
  templateUrl: './res-password.page.html',
  styleUrls: ['./res-password.page.scss'],
})
export class ResPasswordPage implements OnInit {
  data:any = {};
  mensaje:any = {};
  private datos: FormGroup;
  constructor(private formBuilder: FormBuilder,private fire:FirebaseService,private router:Router,private alertCtrl:AlertController,private message:MessagesService) {
    this.datos = this.formBuilder.group({
      'correo': new FormControl('', [Validators.required,Validators.email,Validators.minLength(7)]),
    });
  }

  ngOnInit() {
  }
  private async successfull_resPass() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Perfecto',
      //subHeader: 'Error',
      message:"¡Listo! Revisa tu correo electrónico",
      buttons: [
        {
          text:'Entendido',
          handler: () => {
            this.close();
          }
        }
      ]
    });
    await alert.present();
  }
  private async warning_password() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Advertencia',
      //subHeader: 'Error',
      message:"Se enviará un correo para poder cambiar tu contraseña",
      buttons: [
        {
          text:'Cancelar',
        },
        {
          text:'Aceptar',
          handler: () => {
              this.message.loading();
              setTimeout(()=>{
                this.fire.change_password(this.datos.value.correo);
                this.message.dismiss_loding().then(()=>{
                  this.successfull_resPass();
                },err=>{
                  this.message.error_resPass();
                });
              },1000);
          }
        }
      ]
    });
    await alert.present();
  }
  private close(){
    this.router.navigate(['/login']);
  }
  sendR(){
    this.warning_password();
  }
}
