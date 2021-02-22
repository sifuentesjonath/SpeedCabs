import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { Platform,LoadingController, MenuController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
declare var google:any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map',{read:ElementRef,static: false}) mapRef: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
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
  private map:any; 
  constructor(public zone: NgZone,private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation,private router:Router,private storage:Storage,private menu:MenuController) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.menu.enable(true);
  }
  OnInit(){
    this.showMap();
  }

  ngAfterViewInit() {
		//this.platform.ready().then(() => this.loadMap());
    //this.loadMap();
	}
  showMap() {
    const location= new google.maps.LatLng(-17.824858,31.0533028);
    const options={
      center:location,
      zoom:15,
      disableDefaultUI:true
    }
    this.map=new google.maps.Map(this.mapRef,options);
    google.maps.create();
  }
 
  whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=5213411234404",'_system','location=yes');
  }
  save(){
    //this.router.navigate(['/traveling']);
    this.router.navigate(['/request']);
  }
}
