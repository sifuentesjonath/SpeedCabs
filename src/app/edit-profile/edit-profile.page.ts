import { Component, OnInit,ElementRef } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {ToastController,LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
//imports services
import { MessagesService } from '../services/Messages/messages.service';
import { FirebaseService } from '../services/Firebase/firebase.service';
import { Client} from '../userData/user-interface'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  nombre:  any={};
  apellido:any={};
  correo:  any={};
  correoO: any={};
  celular: any={};
  data:any = {};
  pass:any = {};
  mensaje:any = {};
  private datos: FormGroup;
  private isLoading = false;
  private client:Client;
  private idClient:string='';
  constructor(private fire:FirebaseService,private loadingCtrl:LoadingController,private router:Router,private storage:Storage,private formBuilder: FormBuilder,private message_:MessagesService,private elementRef:ElementRef,private toastCtrl:ToastController) {
    this.datos = this.formBuilder.group({
      'nombre': new FormControl('',[Validators.required]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'celular':new FormControl('', [Validators.required,Validators.pattern(/^[0-9_-]{6,18}$/)]),
    });
  }
  //Metodos
  /*Antes que cargue la ventana consulta los datos del perfil para mostrarolos
    @this.nombre{String}
    @this.apellido{String}
    @this.correo{String}
    @this.celular{String}
  */
  async ngOnInit() {
    this.storage.get('confirmador').then((res) => {
      this.storage.get('Id').then((id) => {
        if(res!=null){
          if(id!=null){
            this.loading();
            this.idClient=id;
            const confirmador=JSON.parse(res);
            this.get_data(id,confirmador);
          }
          else{
            this.message_.general_error();
          }
        }
        else{
          this.message_.general_error();
        }
      });
    });
  }
  /*ionViewCanEnter(){}*/
  private async get_data(id:string,confirmador){
    await this.fire.get_client(id).subscribe(res=>{
      this.client=res;
      this.datos.setValue({nombre:res.name,apellido:res.lastname,correo:confirmador.correo,celular:res.phone});
      setTimeout(()=>{
        this.dismiss();
      },400);
    });
  }
  private dismiss(){
    this.message_.dismiss_loding();
  }
  private loading(){
    this.message_.loading();
  }
  /* Envia los datos para ser actualizados*/
  private async edit(){
    if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.celular!=''){
      if(this.idClient!=''&&this.datos.value.correo!=''){
        this.loading();
        var body={name:this.datos.value.nombre,lastname:this.datos.value.apellido,email:this.datos.value.correo,phone:this.datos.value.celular};
        var date={email:this.client.email,phone:this.client.phone};
        await this.fire.updateClient(this.idClient,body,date).then(()=>{
          setTimeout(()=>{
            this.dismiss();
            if(this.fire.get_check()==true){
              this.storage.set('NombreC',this.datos.value.nombre+' '+this.datos.value.apellido);  
              this.storage.set('PhoneC',this.datos.value.celular);
              this.message_.successfull_edit();
            }
            else{
              this.message_.edit_error();
            }
          },500);
        }).catch(err=>this.dismiss());
      }
      else{
        this.message_.warning_fields();
      }
    }
    else{
      this.message_.warning_fields();
    }
    /*if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.celular!=''){
        },err => {
          /*console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });
      }
      else{
        this.message_.warning_fields();
      }*/  
  }
}
