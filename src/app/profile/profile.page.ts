import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import { Storage } from '@ionic/storage';//Manejo de cache
import { AlertController,ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

//Services
import { FirebaseService } from '../services/Firebase/firebase.service';
import { SocialMediaService} from '../services/Media/social-media.service';
import { MessagesService } from '../services/Messages/messages.service';
import { FilesService} from '../services/Files/files.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private NombreC:String='';
  private data:any={};
  private imgP:any='';
  private idClient:string='';
  private confirmador:any;
  private croppedImagePath:string = '';
  constructor(private camera: Camera,private actionSheet:ActionSheetController,private image:FilesService,private alertCtrl:AlertController,private message:MessagesService,private social:SocialMediaService,private fire:FirebaseService,private router:Router,private storage:Storage) { 
    this.data.nombre = '';
    this.data.appm = '';
    this.data.mail = '';
    this.data.password = '';
  }
  ngOnInit() {
    this.message.loading();
    this.storage.get('NombreC').then((res) => {
      if(res!=null){
        this.NombreC=res;
        this.storage.get('Id').then((res0) => {
          this.storage.get('ProfileImg').then((img)=>{
            this.storage.get('confirmador').then((res_) => {
              if(res!=null){
                this.idClient=res0;
                if(res_!=null){
                  this.imgP=img;
                  this.confirmador=JSON.parse(res_);
                  this.message.dismiss_loding();
                }
              }
            });
          });
        });  
      }                   
    });
  }
  //ionViewDidLoad() {

  //}
  //ionViewCanLeave(){}
  private defaultImg(){
    //if(this.imgP==''||this.imgP==null){
      this.imgP='assets/imgs/profile.jpeg';
    //}
  }
  private async successfull_resPass() {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header:'Perfecto',
      //subHeader: 'Error',
      message:"Se te mandará un correo para cambiar la contraseña.",
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
      message:" ¿Desea cambiar su contraseña?",
      buttons: [
        {
          text:'Cancelar',
        },
        {
          text:'Aceptar',
          handler: () => {
              this.message.loading();
              setTimeout(()=>{
                this.fire.change_password(this.confirmador.correo);
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
    this.storage.clear();
    this.fire.close();
    this.router.navigate(['/login']);
  }
  private whatsapp(){                                            
    this.social.whatsapp();
  }
  private edit(){
    this.router.navigate(['/edit-profile']);
  }
  private async change_pass(){
    /*this.router.navigate(['/change-password']);*/
    this.warning_password();
  }
  private async change_img(){
    if(this.idClient!=''){
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
    }
  }
  private async pickImage(sourceType){
    this.message.loading();
    const options: CameraOptions = {
      quality: 80,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    await this.camera.getPicture(options).then((imageData) => {
      var image='data:image/jpeg;base64,' + imageData;
      this.image.uploadImageToFirebase(image,this.idClient).then(photoURL => {
        this.imgP= image;
        this.set_img(photoURL);
      },(err)=>{
        this.message.dismiss_loding();
        this.message.error_toast();
      });
    },(err)=>{
      this.message.dismiss_loding();
    });
  }
  private async set_img(image:string){
    this.fire.set_img(this.idClient,image).then(()=>{
      this.storage.set('ProfileImg',image);
      this.message.dismiss_loding();
      this.message.toast_successfull();
    })
  }
}
