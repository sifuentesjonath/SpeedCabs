import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor() { }
  public whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=5213411009437",'_system','location=yes');
  }
  whatsapp_user(phone){
    window.open("https://api.whatsapp.com/send?phone=52"+phone,'_system','location=yes');
  }
}
