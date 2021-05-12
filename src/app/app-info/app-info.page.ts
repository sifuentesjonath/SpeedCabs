import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Storage } from '@ionic/storage';//Manejo de cache

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.page.html',
  styleUrls: ['./app-info.page.scss'],
})
export class AppInfoPage implements OnInit {
  version:string='';
  app:string='';
  private imgL:string='';
  constructor(private appVersion:AppVersion,private storage:Storage) { }

  ngOnInit() {
  }
  //metodos
  /*Antes de que cargue la ventana  se consulta la versión y el nombre de la app de manera interna
    @this.app{String}
    @this.version{String}
  */
  async ionViewDidEnter(){
    this.verify_theme();
    this.appVersion.getVersionNumber().then((v)=> {
      this.appVersion.getAppName().then((appN)=>{
        this.app=appN;
        this.version=v;
      });
    });
  }
  verify_theme(){
    this.storage.get('dark_mode').then((mod)=>{
      if(mod==false){
        this.imgL='assets/imgs/logo.png';
      }
      else if(mod==true){
        this.imgL='assets/imgs/logob.png';
 
      }
      else{
        this.imgL='assets/imgs/logo.png';
      }
    });
  }
}
