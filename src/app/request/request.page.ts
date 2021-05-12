import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { MenuController,LoadingController} from '@ionic/angular';
//imports services
import { MessagesService } from '../services/Messages/messages.service';
import { SocialMediaService} from '../services/Media/social-media.service';
import { FirebaseService } from '../services/Firebase/firebase.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Subscription,Observable } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  //
  //private locationC:String;
  //private locationCD:String;
  //private idCliente:String;
  //private cliente:String;
  private data:any={id:'',idClient:'',cliente:'',phone_c:'',locationC:'',locationCD:'',img_client:''};
  private subscriptions_ = new Subscription();

  //
  private costoV:string='40.0 a 50.0 pesos dentro de la ciudad y de 60 o más fuera de la ciudad';
  private mensaje:object;
  private txtorigen:String='Empezar viaje en:';
  private txtdestino:String='Terminar viaje en:';
  private txtCosto:String='Tarifa: $';
  private boolOff=false;
  constructor(private fire:FirebaseService,private social:SocialMediaService,private router:Router,private message:MessagesService,private menu:MenuController,private loadingCtrl:LoadingController,private storage:Storage) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.storage.get('NombreC').then((resu) => {  
      this.storage.get('ubicacionC').then((res) => {
        this.storage.get('ubicacionCD').then((res2) => {
          this.storage.get('Id').then((res3) => { 
            this.storage.get('ProfileImg').then((img)=>{ 
              this.storage.get('PhoneC').then((cel)=>{ 
                if(resu!=null&&res!=null&&res3!=null&&cel!=null){ 
                  this.data.cliente=resu;
                  this.data.phone_c=cel;
                  this.data.locationC=res;
                  this.data.locationCD=res2;
                  this.data.idClient=res3;
                  this.data.img_client=img;
                  //definir costo
                  this.txtCosto='Tarifa: $';
                  this.txtorigen='Empezar viaje en:';
                  this.txtdestino='Terminar viaje en:';
                  this.costoV='40.0 a 50.0 pesos dentro de la ciudad y de 60 pesos o más fuera de la ciudad';         
                }
                else{
                  this.router.navigate(['/home']);        
                }
              });
            });
          });
        });   
      });   
    });    
  }
  ngOnDestroy(){
    this.subscriptions_.unsubscribe();
  }
  ionViewWillLeave(){
    if(this.boolOff==false)
      this.menu.enable(true);
    else  
    this.menu.enable(false);
  }
  //metodos
  async loading() {
    const loading=await this.loadingCtrl.create({
      duration: 50000,
      //duration:9000,
      message:'Buscando'
    })
    await loading.present();
    await loading.onDidDismiss().then(()=>{
      this.change_state();
    });

  }
  async dismiss() {
    await this.loadingCtrl.dismiss();
  }
  whatsapp(){                                            
    this.social.whatsapp();
  }
  /*optiene la ubicación del cliente y la ubicación a donde el cliente se quiere dirigir.
    @this.locationC{string}
    @this.locationCD{string}
  */
  //ionViewCanEnter(){}
  private addLeadingZeros(n):string{
    if(n<=9){
      return "0"+n;
    }
    return n;
  }
  private set subs(subscription: Subscription) {
    this.subscriptions_.add(subscription);
  }
  private async consult_travel(){
    this.subs=get_t;
    var get_t=this.fire.get_travel(this.data.id).subscribe((answer)=>{
      if(answer.idEmployee!=''&&answer.state=='Aceptado'){
        var employee={idEmployee:answer.idEmployee,name_employee:answer.name_employee,phone_employee:answer.phone_employee,model:answer.model,plates:answer.plates,img_employee:answer.img_employee,state:answer.state};
        this.storage.set('Employee',JSON.stringify(employee));
        this.storage.set('idV',this.data.id);
        this.boolOff=true;
        this.dismiss();
        this.router.navigate(['/traveling']);
      }
    });
  }
  private async change_state(){
    var get_t=await this.fire.get_travel(this.data.id).subscribe(async(res)=>{
      if(res.state=='Solicitando'){
        (await this.fire.update_travel(this.data.id)).subscribe((res_update)=>{
          if(res_update==true){
            this.storage.set('Travel',null);
            this.storage.set('idV',null);    
            this.router.navigate(['/home']);
          }
          this.dismiss(); 
        },err=>this.dismiss());
      }
    },err=>this.dismiss()); 
  }
  async startT(){
    var new_date=new Date();
    var now_date=new_date.getUTCFullYear()+'-'+this.addLeadingZeros(new_date.getMonth()+1)+'-'+this.addLeadingZeros(new_date.getDate())+' '+this.addLeadingZeros(new_date.getHours())+':'+this.addLeadingZeros(new_date.getMinutes())+':'+this.addLeadingZeros(new_date.getSeconds());
    if(this.data.img_client!=''&&this.data.img_client!=null){
      if(this.data.locationC!=''&&this.data.locationCD!=''){
        if(this.data.phone_c!=''){
          this.loading();
          var body={idClient:this.data.idClient,idEmployee:'',name_client:this.data.cliente,name_employee:'',origin:this.data.locationC,destiny:this.data.locationCD,date:now_date.toString(),payment_type:'EFECTIVO',state:'Solicitando',phone_client:this.data.phone_c,phone_employee:'',model:'',plates:'',img_client:this.data.img_client,img_employee:'',cost:this.costoV};
          var res=await this.fire.add_travel(body);
          this.data.id=res.id;
          if(this.data.id!=''){
            if(this.data.id!=null){
                this.consult_travel();
            }
          }

        }
        else{
          this.message.general_error();
        }
      }
      else{
        this.message.general_error();
      }
    }
    else{
      this.message.warning_imgs();
    }
    //this.boolOff=true;
    //this.router.navigate(['/traveling']); 
  } 
}
