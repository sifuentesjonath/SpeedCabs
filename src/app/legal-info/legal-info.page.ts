import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import { SocialMediaService} from '../services/Media/social-media.service';

@Component({
  selector: 'app-legal-info',
  templateUrl: './legal-info.page.html',
  styleUrls: ['./legal-info.page.scss'],
})
export class LegalInfoPage implements OnInit {
  items = [
    'Terminos y Condiciones',
    'Aviso de Privacidad'
  ];
  constructor(private social:SocialMediaService,private router:Router) { }

  ngOnInit() {
  }
  //metodos
  ionViewCanEnter(){
  }
  /*Cambia de ventana dependiendo que opción escojas. */
  itemSelected(item: number) {
    if(item===1){
      this.router.navigate(['/terms-conditions']);
    }
    else if(item===2){
      this.router.navigate(['/notice-privacy']);
    }
  }
  infoApp(){
      this.router.navigate(['/app-info']);
  }
  whatsapp(){                                            
    this.social.whatsapp();
  } 
}
