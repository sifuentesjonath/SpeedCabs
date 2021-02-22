import { Component, OnInit,ElementRef } from '@angular/core';
import {Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';
import {ToastController,LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';

//imports services
import { MessagesService } from '../services/Messages/messages.service';
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
  constructor(private loadingCtrl:LoadingController,private router:Router,private storage:Storage,private formBuilder: FormBuilder,private message_:MessagesService,private elementRef:ElementRef,private toastCtrl:ToastController) {
    this.datos = this.formBuilder.group({
      'nombre': new FormControl('',[Validators.required]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'celular':new FormControl('', [Validators.required,Validators.pattern(/^[0-9_-]{6,18}$/)]),
    });
  }
  ngOnInit() {
  }
  //metodos
  async loading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message:'Cargando'
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss_loding() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  /*Antes que cargue la ventana consulta los datos del perfil para mostrarolos
    @this.nombre{String}
    @this.apellido{String}
    @this.correo{String}
    @this.celular{String}
  */
  ionViewCanEnter(){
    /*this.storage.get('confirmador').then((res) => {
      if(res!=null){
            var url = 'http://citcar.relatibyte.mx//mobile/Api/EditPerfil.php';
            this.correoO=res;
            this.nombre='';
            this.apellido='';
            this.correo='';
            this.celular='';
            //let pass=Md5.init(this.datos.value.password);
            let body=JSON.stringify({mail: this.correoO});
            this.http.post(url,body).subscribe(res => {
              this.loading();
              setTimeout(() => {
                if(res===0){
                  this.message_.general_error();
                }      
                else if(res===1){
                  this.message_.error_email(),
                }
                else{
                  this.nombre=  res[0].cliente_nombre;
                  this.apellido=res[0].cliente_apellido;
                  this.correo=  res[0].cliente_correo;
                  this.celular= res[0].cliente_celular;
                }
              },1000);  
              setTimeout(() => {
                this.dismiss_loding();
              },1000);
            },err => {
              this.nombre='';
              this.apellido='';
              this.correo='';
              this.celular='';
            }); 
        }
        else{
          this.message_.warning_fields();
        }              
    });*/
  }
  /* Envia los datos para ser actualizados
  @nombre{String}
  @apellido{String}
  @correo{String}
  @celular{String}
  @return res{int}
  @return res{Boolean}
  */
  edit(){
    /*if(this.datos.value.nombre!=''&&this.datos.value.apellido!=''&&this.datos.value.celular!=''){
        var url = 'http://citcar.relatibyte.mx//mobile/Api/SavePerfil.php';
        let body=JSON.stringify({nombre:this.datos.value.nombre,apellido:this.datos.value.apellido,correoO:this.correoO,correo:this.datos.value.correo,celular:this.datos.value.celular});
        this.http.post(url,body).subscribe(res => {
          if(res===0){
            this.message_.general_error();
          }      
          else if(res==false){
            this.message_.edit_error();
          }
          else{ 
            this.mensaje=res;
            //console.log(this.mensaje);
            this.message_.successfull_edit();
            //this.pass=res[0].cliente_pass;
            //this.storage.set('Apodo',this.nick);
            this.storage.set('confirmador',this.datos.value.correo);              
            this.storage.set('NombreC',this.datos.value.nombre+' '+this.datos.value.apellido); 
            //console.dir(nick+','+pass);
    
          }
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
