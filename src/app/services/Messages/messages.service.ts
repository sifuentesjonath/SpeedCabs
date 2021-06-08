import { Injectable } from '@angular/core';
import { AlertController,LoadingController,ToastController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private isLoading = false;
  constructor(private alertCtrl:AlertController,private loadingCtrl:LoadingController,private toastCtrl:ToastController) { }

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
      message:"Ocurrio un error al editar, intentelo de nuevo",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_email() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Correo o teléfono inválido, por favor intentelo de nuevo",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async error_email1() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Correo incorrecto,por favor verifique su correo",
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
  async error_resPass() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Error',
      //subHeader: 'Error',
      message:"Contraseña no restablecida",
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
  async error_travels() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Hola',
      //subHeader: 'Error',
      message:"No tienes viajes que mostrar",
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
  async warning_imgs() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Advertencia',
      //subHeader: 'Error',
      message:" Actualize primero su imagen de perfil antes de comenzar el viaje",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  async warning_locations() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Advertencia',
      //subHeader: 'Error',
      message:"La ubicación no fue definida corectamente, intentelo de nuevo",
      buttons: ['Entendido']
    });
    await alert.present();
  }
  ///
  async successfull_checkIn() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Exito al registrarse',
      //subHeader: 'Error',
      message:"Por favor revise su bandeja de entrada y verifique su correo electrónico",
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
  //LoadController
  async loading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message:'Cargando'
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() =>{});
        }
      });
    });
  }
  //
  async loading_proccess() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message:'Procesando'
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() =>{});
        }
      });
    });
  }  
  //
  async dismiss_loding() {
    this.isLoading = false;
    await this.loadingCtrl.dismiss();
  }
  ///Toast
  async toast_successfull(){
    const message = await this.toastCtrl.create({
      message: 'La imagen se actualizó correctamente',
      duration: 1000,
      position:'top',
    });
    message.present();
  }
  async error_toast(){
    const message = await this.toastCtrl.create({
      message: 'Error al intentar subir la imagen',
      duration: 1000,
      position:'top',
    });
    message.present();
  }
}
