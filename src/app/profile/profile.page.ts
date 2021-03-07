import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import { Storage } from '@ionic/storage';//Manejo de cache
import { AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

//Services
import { FirebaseService } from '../services/Firebase/firebase.service';
import { SocialMediaService} from '../services/Media/social-media.service';
import { MessagesService } from '../services/Messages/messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  NombreC:String='';
  data:any={};
  imgP:any='';
  imgPA:any='';
  cliente:Number;
  confirmador:any;
  constructor(private imagePicker: ImagePicker,private alertCtrl:AlertController,private message:MessagesService,private social:SocialMediaService,private fire:FirebaseService,private router:Router,private storage:Storage) { 
    this.data.nombre = '';
    this.data.appm = '';
    this.data.mail = '';
    this.data.password = '';
  }
  ngOnInit() {
    this.storage.get('NombreC').then((res) => {
      if(res!=null){
        this.NombreC=res;
        this.storage.get('Id').then((res0) => {
          if(res!=null){
            this.cliente=res0;
            //this.imgP='http://citcar.relatibyte.mx//mobile/images/perfiles/'+this.cliente+'.jpg';
            //this.imgPA=this.imgP;
            this.storage.get('confirmador').then((res) => {
              if(res!=null){
                this.confirmador=JSON.parse(res);
              }
            });
          }
        });  
      }                   
    });
  }
  //ionViewDidLoad() {

  //}
  ionViewCanLeave(){
    /*if(this.imgP!=this.imgPA){
      let url='http://citcar.relatibyte.mx//mobile/Api/UpdateImg.php';
      let datos= new FormData(); 
      datos.append('file',JSON.stringify({cliente:this.cliente,img:this.imgP}));
      //let body=JSON.stringify({cliente:this.cliente,img:datos});
      //let data:Observable<any>=this.http.post(url,body);
      this.http.post(url,datos).subscribe(res => {
        this.storage.clear();
        this.storage.set('Id',this.cliente);
        this.storage.set('NombreC',this.NombreC);
        this.storage.set('confirmador',this.confirmador);        
        /*let prueba=this.storage.keys(); 
        let error = this.alertCtrl.create({
          title: 'Prueba',
          message:JSON.stringify(prueba),
          buttons: ['Entendido']
        });
        error.present();
      });
    }*/
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
  private defaultImg(){
    this.imgP='assets/imgs/profile.jpeg';
  }
  private async change_img(){
    this.imagePicker.hasReadPermission().then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then((results) => {
          for (var i = 0; i < results.length; i++) {
            this.uploadImageToFirebase(results[i]);
          }
        },(err) => console.log(err)
        );
      }
    },(err) => {
      console.log(err);
    });
  }
  uploadImageToFirebase(image){
    //image = normalizeURL(image);
    //uploads img to firebase storage
    //this.fire.uploadImage(image).then(photoURL => {
      /*let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();*/
    //});
  }

}
