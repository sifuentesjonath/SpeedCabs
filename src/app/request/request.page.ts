import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { MenuController,LoadingController} from '@ionic/angular';
//imports services
import { MessagesService } from '../services/Messages/messages.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  locationC:String;
  locationCD:String;
  idCliente:Number;
  cliente:String;
  costoV:String='40.0 a 50.0 pesos dentro de la ciudad y de 60 o más fuera de la ciudad';
  mensaje:object;
  txtorigen:String='Empezar viaje en:';
  txtdestino:String='Terminar viaje en:';
  txtCosto:String='Tarifa: $';
  isLoading = false;
  constructor(private router:Router,private message:MessagesService,private menu:MenuController,private loadingCtrl:LoadingController,private storage:Storage) {
    this.menu.enable(false);
  }

  ngOnInit() {
  }
  //metodos
  async loading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      // duration: 5000,
      message:'Buscando'
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
  whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=5213411234404",'_system','location=yes');
  }
  /*optiene la ubicación del cliente y la ubicación a donde el cliente se quiere dirigir.
    @this.locationC{string}
    @this.locationCD{string}
  */
  ionViewCanEnter(){
    this.storage.get('NombreC').then((resu) => {  
      this.storage.get('ubicacionC').then((res) => {
        this.storage.get('ubicacionCD').then((res2) => {
          this.storage.get('Id').then((res3) => { 
            if(resu!=null&&res!=null&&res3!=null){ 
            //if(resu!=null&&res!=null&&res3!=null&&res2!=null){
              this.cliente=resu;
              this.locationC=res;
              this.idCliente=res3;
              this.locationCD=res2;
              //definir costo
              this.txtCosto='Tarifa: $';
              this.txtorigen='Empezar viaje en:';
              this.txtdestino='Terminar viaje en:';
              this.costoV='40.0 a 50.0 dentro de la ciudad y de 60 o más fuera de la ciudad';         
            }
            else{
              this.router.navigate(['/home']);        
            }
          });
        });   
      });   
    });
  }
  startT(){
    this.router.navigate(['/traveling']);
    //if(this.locationC!=''&&this.locationC!=null){
    /*if(this.locationC!=''&&this.locationC!=null&&this.locationCD!=''&&this.locationCD!=null){
      //let url='http://citcar.relatibyte.mx//mobile/Api/deleteV.php';
      //Esperando,Procesando,Finalizado
      this.loading();
      let url='http://citcar.relatibyte.mx//mobile/Api/consult_act.php';
      let body=JSON.stringify({cliente:this.cliente});
      this.http.post(url,body).subscribe(res => {  
        setTimeout(() => {
          if(res===0){
            let error = this.alertCtrl.create({
            title: 'Error',
            message:"Viaje en progreso.",
            buttons: ['Entendido']
            });
            error.present();
            this.dismiss_loding();
          }      
          else if(res===1){
            var url = 'http://citcar.relatibyte.mx//mobile/Api/connectCitCar/insertViaje.php';
            let body=JSON.stringify({idC:this.idCliente,locationC:this.locationC,locationCD:this.locationCD,cliente:this.cliente,costoV:this.costoV});
            this.http.post(url,body).subscribe(res => {
              this.mensaje=res;
              if(res===0){
                this.message.error_travel();
                this.dismiss_loding();
              }      
              else if(res===1){
                this.message.general_error();
                this.dismiss_loding();
              }
              else if(res===2){
                this.message.error_travel();
                setTimeout(()=>{
                  let url='http://citcar.relatibyte.mx//mobile/Api/consultVA.php';
                  let body=JSON.stringify({cliente:this.cliente});
                  this.http.post(url,body).subscribe(res => {
                    if(res===0){
                      let url='http://citcar.relatibyte.mx//mobile/Api/connectCitCar/deleteV.php';
                      let body=JSON.stringify({cliente:this.cliente});
                      this.http.post(url,body).subscribe(res => {
                        if(res===0){
                          this.message.error_travel();
                          this.dismiss_loding();
                          this.router.navigate(['/home']);        
                        }
                        else if(res===1){
                          this.dismiss_loding();
                        }
                        else{
                          this.dismiss_loding();
                        }
                      });
                    }
                    else{
                      this.storage.set('idV',res[0].idViaje);
                      this.dismiss_loding();
                      //cambiar de página
                      this.router.navigate(['/traveling']);
                    }
                  });
                },40000);                
              }              
            });
          }
          else{ 
            this.message.critical_error();
          }  
        },10000);
      },err => {});
    }*/  
  } 
}
