import { Component, OnInit,ViewChild,ElementRef,NgZone } from '@angular/core';
import { Platform,LoadingController, MenuController} from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
//Servicies
import { SocialMediaService} from '../services/Media/social-media.service';
import { MessagesService } from '../services/Messages/messages.service';
import { consolidateAdaptiveIconResources } from 'cordova-res/dist/platform';
declare var google:any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  direccion:any;
  map:any;
  GoogleAutocomplete: any;
  placeid:string='';
  myLantLng:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  marker:any;
  constructor(private message:MessagesService,private nativeGeocoder: NativeGeocoder,private social:SocialMediaService,private geolocation:Geolocation,private platform: Platform,public zone: NgZone,private router:Router,private storage:Storage,private menu:MenuController) {
    this.menu.enable(true);
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }
  async ngOnInit(){
    await this.loadMap(); 
  }
  async loadMap() {
    //FIRST GET THE LOCATION FROM THE DEVICE.
    this.myLantLng=await this.getLocation();
    setTimeout(() => {
      let mapEle:HTMLElement=document.getElementById('map');
      let connect:HTMLElement=document.getElementById('please-connect');
      this.map=new google.maps.Map((mapEle),{
        center:this.myLantLng,
        zoom:12,
        disableDefaultUI: true,
      });
      google.maps.event.addListenerOnce(this.map,'idle',()=>{
        this.addMarker(this.myLantLng);
        connect.remove();
      });
      this.directionsDisplay.setMap(this.map);
    },500);

  }
  private async getLocation(){
    const rta= await this.geolocation.getCurrentPosition();
    return{lat:rta.coords.latitude,lng:rta.coords.longitude}
  }
  private addMarker(myLantLng){
    this.marker=new google.maps.Marker({
        position:{
          lat:myLantLng.lat,
          lng:myLantLng.lng
        },
        zoom:12,
        map:this.map,
        title:'Mi ubicación'
    });
    this.geocode(this.marker,this.storage);
  }
  ///
  private geocode(marker,storage){
    // creamos el objeto geodecoder
    var geocoder = new google.maps.Geocoder();
    let infoWindow;
     // solo se utiliza la función del geocoder para que al cargar se muestre la onformación
      geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            this.direccion=results[0]['formatted_address'];
            let content="<h6>Información:</h6>"+this.direccion;
            infoWindow=new google.maps.InfoWindow({content:content}); 
            infoWindow.open(this.direccion,marker);
            storage.set('ubicacionC',this.direccion);   
        }
      });
      // le asignamos una funcion al eventos dragend del marcado    
      google.maps.event.addListener(marker,'dragend',function(){
        infoWindow.close();
        geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              this.direccion=results[0]['formatted_address'];
              let content="<h6>Información:</h6>"+this.direccion;
              infoWindow=new google.maps.InfoWindow({content:content}); 
              infoWindow.open(this.direccion,marker);
              storage.set('ubicacionC',this.direccion);   
          }
        });   
      });
    //});
  }
  private calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: that.myLantLng,
      destination: formValues,
      travelMode: 'DRIVING'
    },(response,status) => {
      if (status==='OK') {
        that.directionsDisplay.setDirections(response);
        that.geocoder(formValues);
      } else {
        alert('La solicitud de indicaciones falló debido a ' + status);
      }
    });
  }
  private geocoder(latLng){
    var geocoder=new google.maps.Geocoder();
    const that=this;
    let storage=this.storage;
    geocoder.geocode({'latLng': latLng},function(results, status){
      if(status==google.maps.GeocoderStatus.OK) {   
        that.direccion=results[0]['formatted_address'];
        storage.set('ubicacionCD',that.direccion);
        that.saveDisabled = false; 
      }
      that.message.dismiss_loding();
    });
   /*google.maps.event.addListener(marker,'dragend',function(){
      infoWindow.close();  
      geocoder.geocode({'latLng': latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          this.direccion=results[0]['formatted_address'];
          /*let content="<h6>Información:</h6>"+this.direccion;
          infoWindow=new google.maps.InfoWindow({content:content}); 
          infoWindow.open(this.direccion,marker);
          storage.set('ubicacionCD',this.direccion);   
        }
      });
    });*/
  }  
  private selectPlace(place) {
    this.placeid = place.place_id;
    this.places = [];
    let location = {
        lat: null,
        lng: null,
        name: place.name
    };
    this.message.loading();
    this.marker.setMap(null);
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails({placeId: place.place_id}, (details) => {
      this.zone.run(() => {
        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        this.calculateAndDisplayRoute(latLng); 
        //console.log(google.maps.map);
        //google.maps.Map.setCenter({lat: location.lat, lng: location.lng});
        /*const latLng = new google.maps.LatLng(location.lat, location.lng);
        this.calculateAndDisplayRoute(latLng); 
        this.location = location;*/
        //this.markers.push(marker);
        //marker.setMap(google.map);
      });
    });
  } 
  //hace la predicción en base a lo que busques
  private searchPlace(){
      this.saveDisabled = true;
      var config = {
        types: ['geocode'],
        input:this.query,
        location:new google.maps.LatLng(19.7001632,-103.4639353,19.7001632,-103.4639353),
        radius: '12000',
        componentRestrictions:{
          country:"MX",       
        }
      }
      if (this.query == '') {
        this.places = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions(config,(predictions,status)=>{
        if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
          this.places = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.places.push(prediction);
            });
          });
        }
      });    

  }
  ///
  private whatsapp(){                                            
    this.social.whatsapp();
  }
 private  save(){
    //this.router.navigate(['/traveling']);
    this.router.navigate(['/request']);
  }
}
