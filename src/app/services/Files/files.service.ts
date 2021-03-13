import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController} from '@ionic/angular';
import { Observable } from 'rxjs';

//Services
import { FirebaseService } from '../Firebase/firebase.service';
import { MessagesService } from '../Messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  //private croppedImagePath:string = '';
  //private idClient:string='';
  constructor(private fire:FirebaseService,private message:MessagesService,private camera: Camera,private actionSheet: ActionSheetController) { 

  }
  public async uploadImageToFirebase(image:string,idClient:string){
    return await this.fire.uploadImage(image,idClient);
  } 
  /*private pickImage(sourceType):any{
    /*this.croppedImagePath='';
    const options: CameraOptions = {
      quality: 80,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      this.message.loading();
      this.uploadImageToFirebase(this.croppedImagePath);
      return this.croppedImagePath;
    }, (err) => {});
  }
  private async selectImage(Id:string){
    /*this.croppedImagePath='';
    this.idClient=Id;
    const actionSheet = await this.actionSheet.create({
      header: "Seleccione una opción",
      buttons: [{
        text:'Cargar desde biblioteca',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text:'Usar la camara',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text:'Cancelar',
        role:'cancel'
      }
      ]
    });
    await actionSheet.present();
  }*/

}
