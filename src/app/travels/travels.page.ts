import { Component, OnInit } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache

//import Services
import { SocialMediaService} from '../services/Media/social-media.service';
import { FirebaseService } from '../services/Firebase/firebase.service';
import { MessagesService } from '../services/Messages/messages.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {
  viajes:Object=[{}];
  simbolo:string='';
  txtDate:string='';
  private idV:string='';
  private travels=new Array();
  constructor(private fire:FirebaseService,private message:MessagesService,private social:SocialMediaService,private storage: Storage,private loadingCtrl:LoadingController) { 
  }
  private dismiss(){
    this.message.dismiss_loding();
  }
  private loading(){
    this.message.loading();
  }
  async ionViewDidEnter(){
    this.storage.get('Id').then(async(id)=>{
      this.travels=[];
      if(id!=null){
        this.idV=id;
        this.loading();
        var sus_t=await this.fire.get_travels().subscribe((res)=>{
          res.map((answer)=>{
            if(answer.idClient==this.idV&&answer.idEmployee!=''){
              this.simbolo='$';
              this.txtDate='Fecha:';
              this.travels.push(answer);   
            }
          },err=>this.dismiss());
          this.dismiss();
          sus_t.unsubscribe();
        },err=>this.dismiss());
      } 
      else{
        this.message.error_travels();
      }
    });
  }
  ionViewDidLoad() {
  }
  /*Pausa el loging*/
  ngOnInit() {
  }
  whatsapp(){                                            
    this.social.whatsapp();
  }
}
