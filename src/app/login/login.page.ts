import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';
import { Router }from '@angular/router';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
//import { RegistrarsePage } from '../registrarse/registrarse';
import { Storage } from '@ionic/storage';//Manejo de cache
//imports services
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
  private client:any={};
  private datos: FormGroup;
  constructor(private storage: Storage,private formBuilder: FormBuilder,private fire:FirebaseService,private message:MessagesService,private router:Router,private menu:MenuController) {
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
    var body={correo:this.datos.value.correo,password:this.datos.value.password};
    this.message.loading();
    await this.fire.login().then((res)=>{
      res.subscribe(result=>{
        result.map(res=>{
          if(res.email==body.correo){
            this.client={id:res.id,namel:res.name+' '+res.lastname,image_c:res.img_client};
            this.fire.loginUser(body).then(()=>{
              this.storage.set('confirmador',JSON.stringify({correo:this.datos.value.correo}));            
              this.storage.set('Id',this.client.id);
              this.storage.set('NombreC',this.client.namel);
              this.storage.set('ProfileImg',this.client.image_c);
              this.message.dismiss_loding();
              this.menu.enable(true);
              this.router.navigate(['/home']);
            },err=>{
              this.message.dismiss_loding();
              this.message.error_emailPass();         
            });
          }
        },err => {
          this.message.dismiss_loding();
        });
      });
    },err => {
      this.message.dismiss_loding();
    });
  }
  private passwordR(){
    this.router.navigate(['/res-password']);
    
  }
  private check_in(){
    this.router.navigate(['/check-in']);
  }

}
