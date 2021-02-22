import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import { Storage } from '@ionic/storage';//Manejo de cache
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  NombreC:String='';
  data:any={};
  imgP:any='';
  imgPA:any='';
  cliente:Number;
  confirmador:any;
  constructor(private router:Router,private storage:Storage) { 
    this.data.nombre = '';
    this.data.appm = '';
    this.data.mail = '';
    this.data.password = '';
  }
  ngOnInit() {
    this.storage.get('NombreC').then((res) => {
      if(res!=null){
        this.NombreC=res;
        this.storage.get('Id').then((res0) => {
          if(res!=null){
            this.cliente=res0;
            //this.imgP='http://citcar.relatibyte.mx//mobile/images/perfiles/'+this.cliente+'.jpg';
            //this.imgPA=this.imgP;
            this.storage.get('confirmador').then((res) => {
              if(res!=null){
                this.confirmador=res;
              }
            });
          }
        });  
      }                   
    });
  }
  //ionViewDidLoad() {

  //}
  ionViewCanLeave(){
    /*if(this.imgP!=this.imgPA){
      let url='http://citcar.relatibyte.mx//mobile/Api/UpdateImg.php';
      let datos= new FormData(); 
      datos.append('file',JSON.stringify({cliente:this.cliente,img:this.imgP}));
      //let body=JSON.stringify({cliente:this.cliente,img:datos});
      //let data:Observable<any>=this.http.post(url,body);
      this.http.post(url,datos).subscribe(res => {
        this.storage.clear();
        this.storage.set('Id',this.cliente);
        this.storage.set('NombreC',this.NombreC);
        this.storage.set('confirmador',this.confirmador);        
        /*let prueba=this.storage.keys(); 
        let error = this.alertCtrl.create({
          title: 'Prueba',
          message:JSON.stringify(prueba),
          buttons: ['Entendido']
        });
        error.present();
      });
    }*/
  }
  defaultImg(){
    this.imgP='assets/imgs/profile.jpeg';
  }
  close(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }
  whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=5213411234404",'_system','location=yes');
  }
  edit(){
    this.router.navigate(['/edit-profile']);
  }
  change_pass(){
    this.router.navigate(['/change-password']);
  }

}
