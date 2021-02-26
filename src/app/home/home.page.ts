import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { Platform,LoadingController, MenuController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /*@ViewChild('pleaseConnect') pleaseConnect: ElementRef;*/
  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  location: any;
  address:string;
  direccion:any;
  saveDisabled:Boolean=false;
  map:any;
  constructor(private geolocation:Geolocation,private platform: Platform,public zone: NgZone,private router:Router,private storage:Storage,private menu:MenuController) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.menu.enable(true);
  }
  async ngOnInit(){
    this.loadMap();
  }
  ngAfterViewInit() {
		//this.platform.ready().then(() => this.loadMap());
    //this.loadMap();
	}
  async loadMap() {
    let myLantLng=await this.getLocation();
    setTimeout(() => {
      const mapEle:HTMLElement=document.getElementById('map');
      const connect:HTMLElement=document.getElementById('please-connect');
      this.map=new google.maps.Map((mapEle),{
        center:myLantLng,
        zoom:12,
        disableDefaultUI: true,
      });
      google.maps.event.addListenerOnce(this.map,'idle',()=>{
        connect.remove();
        this.addMarker(myLantLng);
      });
    },1000);
  }
  private async getLocation(){
    const rta= await this.geolocation.getCurrentPosition();
    return{lat:rta.coords.latitude,lng:rta.coords.longitude}
  }
  private addMarker(myLantLng){
    const marker=new google.maps.Marker({
        position:{
          lat:myLantLng.lat,
          lng:myLantLng.lng
        },
        zoom:12,
        map:this.map,
        title:'Mi ubicación'
    });
  }

  whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=5213411234404",'_system','location=yes');
  }
  save(){
    //this.router.navigate(['/traveling']);
    this.router.navigate(['/request']);
  }
}
