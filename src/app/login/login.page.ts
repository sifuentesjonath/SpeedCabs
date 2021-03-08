import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';
import { Router }from '@angular/router';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
//import { RegistrarsePage } from '../registrarse/registrarse';
import { Storage } from '@ionic/storage';//Manejo de cache
//imports services
import { Aes256Service } from '../services/AES-256/aes-256.service';
import { MessagesService } from '../services/Messages/messages.service';
import { FirebaseService } from '../services/Firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Id:Number;
  nombre:String;
  app:String;
  pass:any = {};
  correoO:String;
  cliente:String;
  private datos: FormGroup;
  constructor(private storage: Storage,private formBuilder: FormBuilder,private fire:FirebaseService,private message:MessagesService,private aes256:Aes256Service,private router:Router,private menu:MenuController) {
    this.menu.enable(false);
    this.datos = this.formBuilder.group({
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]{6,18}$/)]),
    });
  }

  ngOnInit() {
  }
  ionViewCanEnter(){}

  private async enter_home(){
    let body={correo:this.datos.value.correo,password:this.datos.value.password};
    this.message.loading();
    await this.fire.login(body).then((res)=>{
      var compare=this.fire.get_state();
        var fin= setInterval(()=>{
          compare= this.fire.get_state();
        },300);
        setTimeout(()=>{
          clearInterval(fin);
          this.message.dismiss_loding();
          if(compare==true){
            this.storage.set('confirmador',JSON.stringify({correo:this.datos.value.correo}));
            this.menu.enable(true);
            this.router.navigate(['/home']);
          }
          else{
            this.message.error_emailPass();         
          }
        },1200);
    },err => {
      this.message.dismiss_loding();
    });
    /*this.fire.login(body).then(res=>{
      setTimeout(() => {
        this.dismiss_loding();
      },1000);
    },err=>{});*/
    //this.provedor.submit(this.data.nickname,this.data.password);
    /*var url ='http://citcar.relatibyte.mx/mobile/Api/connectApi.php';
    let pass=this.aes256.encrypt(this.data.password);
    let body=JSON.stringify({correo:this.data.correo,password:pass});
    this.loading();
    this.http.post(url,body).subscribe(res => {
      setTimeout(() => {
        if(res===0){
          /*let error = this.alertCtrl.create({
            header: 'Error',
            message:"Usuario o contraseña incorrecta,por favor intentelo de nuevo",
            buttons: ['Entendido']
          });
          error.present();
          this.alert_error();
          this.dismiss_loding();
        }
        else{ 
          this.Id=res[0].idCliente;
          this.nombre=res[0].cliente_nombre;
          this.app=res[0].cliente_apellido;
          this.pass=res[0].cliente_pass;
          this.correoO=res[0].cliente_correo;
          this.storage.set('Id',this.Id);
          this.storage.set('NombreC',this.nombre+' '+this.app);
          this.storage.set('confirmador',this.correoO);
          this.dismiss_loding();
          let currentIndex = this.navCtrl.getActive().index;
          
          this.navCtrl.push(HomePage).then(() => {
              this.navCtrl.remove(currentIndex);
          });

        }
      },1000);
    },err => {});*/
    //this.router.navigate(['/home']);
  }
  private passwordR(){
    this.router.navigate(['/res-password']);
    
  }
  private check_in(){
    this.router.navigate(['/check-in']);
  }

}
