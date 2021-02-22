import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.page.html',
  styleUrls: ['./app-info.page.scss'],
})
export class AppInfoPage implements OnInit {
  version:string='';
  app:string='';
  constructor(private appVersion:AppVersion) { }

  ngOnInit() {
  }
  //metodos
  /*Antes de que cargue la ventana  se consulta la versión y el nombre de la app de manera interna
    @this.app{String}
    @this.version{String}
  */
 ionViewCanEnter(){
  //this.appVersion.getVersionCode();
  this.appVersion.getVersionNumber().then((v)=> {
    this.appVersion.getAppName().then((appN)=>{
      this.app=appN;
      this.version=v;
    });
  });
}
}
