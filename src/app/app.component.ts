import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router }from '@angular/router';
import { Storage } from '@ionic/storage';//Manejo de cache

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  cliente:String='';
  darkMode: boolean=true;
  darkMod: boolean;
  mod:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private storage:Storage,
  ) {
    this.sideMenu();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    this.initializeApp();
  }
  sideMenu(){
    this.navigate =
    [
      {
        title : "Inicio",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Perfil",
        url   : "/profile",
        icon  : "person-circle-outline"
      },
      {
        title : "Viajes",
        url   : "/travels",
        icon  : "airplane-outline"
      },
      /*{
        title : "Métodos de pago",
        url   : "/contacts",
        icon  : "pricetags-outline"
      },*/
      {
        title : "Información legal",
        url   : "/legal-info",
        icon  : "newspaper-outline"
      },
    ]
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.storage.get('Id').then((res) => {
          this.storage.get('NombreC').then((resu) => { 
          this.storage.get('idV').then((resI) => {    
            if(res!=null&&resu!=null){
              if(resI!=null){    
              /*this.cliente=resu;
                let url='http://citcar.relatibyte.mx//mobile/Api/consultV_ACT.php';
                let body=JSON.stringify({idV:resI,cliente:this.cliente});
                this.http.post(url,body).subscribe(res => {  
                  setTimeout(() => {
                    if(res===0){
                      //this.rootPage=TravelingPage;
                      this.rootPage=TravelingPage;
                      this.splashScreen.hide();
                    }      
                    if(res===1){
                      //this.rootPage=HomePage;
                      //this.rootPage=TravelingPage;
                      this.rootPage=HomePage;
                      this.splashScreen.hide();                
                    } 
                  },500);
                },err => {});*/
                this.router.navigateByUrl('/traveling');
                this.hide_splashScreen(); 
              }
              else{
                this.router.navigateByUrl('/home');
                this.hide_splashScreen(); 
              }
            }
            else{
              this.router.navigateByUrl('/login');
              //this.router.navigate['/login'];
              this.hide_splashScreen(); 
            } 
          }); 
          });
        });
      },1000);
    });
  }
  hide_splashScreen(){
    this.splashScreen.hide();
    this.checkDarkTheme();
    this.mod_color();
  }
  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(prefersDark.matches){
      document.body.classList.toggle('dark');
    }
  }
  mod_color(){
    this.storage.get('dark_mode').then((mod)=>{
      if(mod==false){
        this.darkMod=mod;
        document.body.classList.toggle('dark',mod);
      }
      else if(mod==true){
        this.darkMod=mod;
        document.body.classList.toggle('dark',!mod); 
      }
      else{
        this.darkMod=false;
        document.body.classList.toggle('dark',false);
      }
    });
  }
  changeMod(){
    this.darkMode = !this.darkMode;
    this.darkMod=this.darkMode;
    this.storage.set('dark_mode',this.darkMode);
    document.body.classList.toggle('dark',this.darkMod);
  }

}
