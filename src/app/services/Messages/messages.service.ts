import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  constructor(private alertCtrl:AlertController) { }

  async error_emailPass() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message: 'Usuario o contraseña incorrecta,por favor intentelo de nuevo',
      buttons: ['Entendido']
    });

    await alert.present();
  }
  async general_error() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Ocurrio un error,intentelo de nuevo",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async critical_error() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error critico',
      //subHeader: 'Error',
      message:"Acceso denegado",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async edit_error() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Ocurrio un error al editar, intentelo de nuevo.",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_email() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Email en uso, por favor intentelo de nuevo",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_email1() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Email incorrecto,por favor verifique su correo",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_passConfirm() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Las contraseñas no coinciden",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_actaulPass() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Contraseña actual no coincide",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_travel() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Chofer no asignado, vuelva a intentarlo más tarde",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  ///
  async warning_fields() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Advertencia',
      //subHeader: 'Error',
      message:" Por favor llena todo los campos",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  ///
  async successfull_checkIn() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Perfecto',
      //subHeader: 'Error',
      message:"Exito al registrarse.",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async successfull_resPass() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Perfecto',
      //subHeader: 'Error',
      message:"Se te mandará un correo para cambiar la contraseña.",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async successfull_edit() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Perfecto',
      //subHeader: 'Error',
      message:"Exito al editar.",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async successfull_travel() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Perfecto',
      //subHeader: 'Error',
      message:"Viaje solicitado.",
      buttons: ['Entendido']
    });
    await alert.present();
  }
}
