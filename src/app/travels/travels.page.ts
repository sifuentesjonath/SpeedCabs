import { Component, OnInit } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {
  viajes:Object=[{}];
  pausa:boolean=false;
  isLoading:Boolean=false;
  simbolo:String='';
  constructor(private storage: Storage,private loadingCtrl:LoadingController) { 
  }
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
  ionViewCanEnter(){
    /*this.storage.get('NombreC').then((res) => {
      if(res!=null){
        let url='http://citcar.relatibyte.mx//mobile/Api/consultV_did.php';
        let body=JSON.stringify({cliente:res});
        this.loading();
        this.http.post(url,body).subscribe(res => {
          setTimeout(() => {
            if(res===0){
              let error = this.alertCtrl.create({
                title: 'Error',
                message:"No Hay viajes que mostrar",
                buttons: ['Entendido']
              });
              error.present();
            }
            else{
              this.viajes=res; 
              this.simbolo='$';
            }
          },1000);  
          setTimeout(() => {
            this.dismiss_loding();
          },1000);
        },err => {});
      }
    });*/
  }
  ionViewDidLoad() {
  }
  /*Pausa el loging*/
  ionViewDidEnter(){
    this.pausa=true;
  }
  ngOnInit() {
  }
  whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=5213411234404",'_system','location=yes');
  }
}
