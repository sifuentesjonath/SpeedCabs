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
    var promise=await this.loginUser(body);
    if(promise==true){
      await this.fire.loginUser(body).then((res)=>{
        this.storage.set('confirmador',JSON.stringify({correo:this.datos.value.correo}));            
        this.storage.set('Id',this.client.id);
        this.storage.set('NombreC',this.client.namel);
        this.storage.set('PhoneC',this.client.phone_c);
        this.storage.set('ProfileImg',this.client.image_c);
        this.message.dismiss_loding();
        this.menu.enable(true);
        this.router.navigate(['/home']);
      }).catch(err=>{
        this.message.error_emailPass();
      });
    }
    else{
      this.message.error_emailPass();
    }
    this.message.dismiss_loding();
  }
  private async loginUser(date){
    var compare=false;
    return new Promise<any>(async(resolve,reject) => {
      await (await this.fire.login()).subscribe((result)=>{
        result.map(res_=>{
          if(res_.email==date.correo){
            this.client={id:res_.id,namel:res_.name+' '+res_.lastname,phone_c:res_.phone,image_c:res_.img_client};
            resolve(true);
          }
          else{
            compare=false;
          }
        })
        resolve(compare);
      },err=>{
        reject(compare);
      });
    }); 
  }
  private passwordR(){
    this.router.navigate(['/res-password']);
    
  }
  private check_in(){
    this.router.navigate(['/check-in']);
  }

}
