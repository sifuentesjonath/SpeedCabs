import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/Messages/messages.service';
@Component({
  selector: 'app-res-password',
  templateUrl: './res-password.page.html',
  styleUrls: ['./res-password.page.scss'],
})
export class ResPasswordPage implements OnInit {
  data:any = {};
  mensaje:any = {};
  constructor(private message:MessagesService) { }

  ngOnInit() {
  }
  sendR(){
    /*var url = 'http://citcar.relatibyte.mx//mobile/Api/resPassApi.php';
    //let password=Md5.init(this.data.password);
    let body=JSON.stringify({correo:this.data.correo});
    this.http.post(url,body).subscribe(res => {
      if(res===0){
        this.message.error_email1();
      }
      else{ 
        this.mensaje=res;
        //console.log(this.mensaje);
        this.message.successfull_resPass();
        //this.pass=res[0].cliente_pass;
        //this.storage.set('Apodo',this.nick);
        //this.storage.set('confirmador',this.nick+this.pass);
        //console.dir(nick+','+pass);

      }
    },err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
    });*/
  }
}
