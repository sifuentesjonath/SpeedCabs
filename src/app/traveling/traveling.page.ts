import { Component, OnInit,AfterViewInit, OnChanges, EventEmitter,Input, ElementRef, Renderer2, Output, SimpleChanges,NgZone } from '@angular/core';
import { Platform,AlertController,MenuController,DomController } from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { DrawerState } from '../services/Drawer/drawer-state';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Subscription,Observable } from 'rxjs';

//imports services
import * as Hammer from 'hammerjs';
import { SocialMediaService} from '../services/Media/social-media.service';
import { MessagesService } from '../services/Messages/messages.service';
import { FirebaseService } from '../services/Firebase/firebase.service';

declare var google:any;
@Component({
  selector: 'app-traveling',
  templateUrl: './traveling.page.html',
  styleUrls: ['./traveling.page.scss'],
})
export class TravelingPage implements OnInit {
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
  cliente:string;
  idConductor:string;
  idV:string='';
  imgP:string='';
  conductor:string='';
  modelo:string='';
  placas:string='';
  costo:string='';
  destino:string='';
  origen:string='';
  txts={txtCosto:'',txtC:'',txtO:'',txtD:'',txtM:'',txtP:''};
  messageT:String='En Espera...';
  private employee={idEmployee:'',name_employee:'',phone_employee:'',model:'',plates:'',img_employee:'',state:''};
  private subscriptions_ = new Subscription();

  //
  dockedHeight = 50;
  shouldBounce = true;
  disableDrag = false;
  distanceTop = 300;
  transition = '0.25s ease-in-out';
  state: DrawerState = DrawerState.Bottom;
  minimumHeight = 20;
  stateChange: EventEmitter<DrawerState> = new EventEmitter<DrawerState>();
  private _startPositionTop: number;
  private readonly _BOUNCE_DELTA = 30;
  private map:any;
  private GoogleAutocomplete: any;
  private placeid:string='';
  private myLantLng:any;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;
  private marker:any;
  private lantLngO:any;
  private lantLngD:any;
  //private lantLng={origin:{lat:'',long:''},destiny:{lat:'',long:''}};
  constructor(private fire:FirebaseService,private message:MessagesService,private alertCtrl:AlertController,private geolocation:Geolocation,private zone: NgZone,private social:SocialMediaService,private _element: ElementRef,private _renderer: Renderer2,private _domCtrl: DomController,private _platform: Platform,private router:Router,private storage:Storage,private menu:MenuController) {
    this.menu.enable(false);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }
  async ngOnInit() {
    this.imgP='assets/imgs/perfil.png';
    await this.loadMap();
    this.storage.get('ubicacionC').then((origen) => {
      this.storage.get('ubicacionCD').then((destino) => { 
        this.storage.get('Employee').then((res_employee) => { 
          this.storage.get('idV').then((res_id) => {   
            if(origen!=null&&destino!=null){
              this.employee=JSON.parse(res_employee); 
              if(res_id!=null){
                  this.idV=res_id;
                  this.txts.txtM='Modelo: ';
                  this.txts.txtP='Placas: ';
                  this.txts.txtO='Recoger en:';
                  this.origen=origen;
                  this.txts.txtD='Llevar a:';
                  this.destino=destino;
                  this.imgP=this.employee.img_employee;
                  this.txts.txtC='Conductor: ';
                  this.conductor=this.employee.name_employee;
                  this.txts.txtCosto='Costo: ';
                  this.costo='40.0 a 50.0 pesos dentro de la ciudad y de 60 pesos o más fuera de la ciudad';           
                  this.mapMaker(this.origen,this.destino);
                  this.consult_travel();
              }
              else{
                this.router.navigate(['/home']);
              }
            }
          });
        });
      });
    });
  }
  //ngOnDestroy(){}
  ngAfterViewInit() {
  }
  private set subs(subscription: Subscription) {
    this.subscriptions_.add(subscription);
  }
  private dismiss(){
    this.message.dismiss_loding();
  }
  private loading(){
    this.message.loading();
  }
  private async consult_travel(){
    this.subs=get_t;
    var get_t=this.fire.get_travel(this.idV).subscribe((answer)=>{
      if(answer.idEmployee!=''&&answer.state!=''){
        this.messageT=answer.state;
        if(answer.state=='Cancelado'||answer.state=='Finalizado'){
          this.storage.set('Travel',null);
          this.storage.set('idV',null); 
          this.idV='';
          this.txts.txtM='';
          this.txts.txtP='';
          this.txts.txtO='';
          this.origen='';
          this.txts.txtD='';
          this.destino='';
          this.imgP='assets/imgs/perfil.png';
          this.txts.txtC='';
          this.conductor='';
          this.txts.txtCosto='';
          this.costo='';    
          this.router.navigate(['/home']);
          this.subscriptions_.unsubscribe();
        }
      }
    });
  }
  mapMaker(origen,destino){
    const that=this;
    var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address':origen}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var lat_o = results[0].geometry.location.lat();
          var long_o= results[0].geometry.location.lng();
          geocoder.geocode({'address':destino}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var lat_d= results[0].geometry.location.lat();
              var long_d= results[0].geometry.location.lng();
              that.lantLngO=new google.maps.LatLng(lat_o,long_o);
              that.lantLngD=new google.maps.LatLng(lat_d,long_d);
              that.calculateAndDisplayRoute(that.lantLngD); 
            } 
            else {
            }
          });
        } 
        else {
        }
      });
  } 
  async loadMap() {
    this.myLantLng=await this.getLocation();
    setTimeout(() => {
      const  mapEle:HTMLElement=document.getElementById('map_');
      const connect:HTMLElement=document.getElementById('please-connect_');
      this.map=new google.maps.Map((mapEle),{
        center:this.myLantLng,
        zoom:12,
        disableDefaultUI: true,
      });
      google.maps.event.addListenerOnce(this.map,'idle',()=>{
        //this.addMarker(this.myLantLng);
        //this.calculateAndDisplayRoute();
        connect.remove();
      });
      this.directionsDisplay.setMap(this.map);
    },500);

  }
  private async getLocation(){
    const rta= await this.geolocation.getCurrentPosition();
    return{lat:rta.coords.latitude,lng:rta.coords.longitude}
  }
  private calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: that.lantLngO,
      destination: formValues,
      travelMode: 'DRIVING'
    },(response,status) => {
      if (status==='OK') {
        that.directionsDisplay.setDirections(response);
        //that.geocoder(formValues);
      } else {
        alert('La solicitud de indicaciones falló debido a ' + status);
      }
    });
  }
  private selectPlace(place):string{
    this.placeid = place.place_id;
    this.places = [];
    let location = {
        lat: null,
        lng: null,
        name: place.name
    };
    this.marker.setMap(null);
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(/*{placeId: place.place_id},*/ (details) => {
      this.zone.run(() => {
        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        return latLng; 
      });
    });
    return '';
  }
  private addMarker(lat_o,lng_o){
    this.marker=new google.maps.Marker({
        position:{
          lat:lat_o,
          lng:lng_o
        },
        zoom:12,
        map:this.map,
        title:'Recoger cliente'
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
  private minimize(){
  }
  private ngOnChanges(changes: SimpleChanges) {
    if (!changes.state) {
      return;
    }
    this._setDrawerState(changes.state.currentValue);
  }
  private _setDrawerState(state: DrawerState) {
    this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);
    switch (state) {
      case DrawerState.Bottom:
        this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
        break;
      case DrawerState.Docked:
        this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
        break;
      default:
        this._setTranslateY(this.distanceTop + 'px');
    }
  }

  private _handlePanStart() {
    this._startPositionTop = this._element.nativeElement.getBoundingClientRect().top;
  }

  private _handlePanEnd(ev) {
    if (this.shouldBounce && ev.isFinal) {
      this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);

      switch (this.state) {
        case DrawerState.Docked:
          this._handleDockedPanEnd(ev);
          break;
        case DrawerState.Top:
          this._handleTopPanEnd(ev);
          break;
        default:
          this._handleBottomPanEnd(ev);
      }
    }
    this.stateChange.emit(this.state);
  }

  private _handleTopPanEnd(ev) {
    if (ev.deltaY > this._BOUNCE_DELTA) {
      this.state = DrawerState.Docked;
    } else {
      this._setTranslateY(this.distanceTop + 'px');
    }
  }

  private _handleDockedPanEnd(ev) {
    const absDeltaY = Math.abs(ev.deltaY);
    if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY < 0) {
      this.state = DrawerState.Top;
    } else if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY > 0) {
      this.state = DrawerState.Bottom;
    } else {
      this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
    }
  }

  private _handleBottomPanEnd(ev) {
    if (-ev.deltaY > this._BOUNCE_DELTA) {
      this.state = DrawerState.Docked;
    } else {
      this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
    }
  }

  private _handlePan(ev) {
    const pointerY = ev.center.y;
    this._renderer.setStyle(this._element.nativeElement, 'transition', 'none');
    if (pointerY > 0 && pointerY < this._platform.height()) {
      if (ev.additionalEvent === 'panup' || ev.additionalEvent === 'pandown') {
        const newTop = this._startPositionTop + ev.deltaY;
        if (newTop >= this.distanceTop) {
          this._setTranslateY(newTop + 'px');
        } else if (newTop < this.distanceTop) {
          this._setTranslateY(this.distanceTop + 'px');
        }
        if (newTop > this._platform.height() - this.minimumHeight) {
          this._setTranslateY((this._platform.height() - this.minimumHeight) + 'px');
        }
      }
    }
  }
  private _setTranslateY(value) {
    this._domCtrl.write(() => {
      this._renderer.setStyle(this._element.nativeElement, 'transform', 'translateY(' + value + ')');
    });
  }
  private whatsapp(){                                            
    this.social.whatsapp_user(this.employee.phone_employee);
  }
  private async change_state(){
    var get_t=await this.fire.get_travel(this.idV).subscribe(async(res)=>{
      if(res.state=='Aceptado'||res.state=='En proceso'){
        await (await this.fire.update_travel(this.idV)).subscribe((res_update)=>{
          if(res_update==true){
            this.storage.set('Travel',null);
            this.storage.set('idV',null);    
            this.subscriptions_.unsubscribe();
            this.router.navigate(['/home']);
          }
          this.dismiss(); 
        },err=>this.dismiss());
      }
    },err=>this.dismiss()); 
  }
  private async cancel(){
    const alert = await this.alertCtrl.create({
      header: '',
      message: '<strong>¿Desea cancelar el viaje?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Si',
          handler: () => {
            this.loading();
            this.change_state();
          }
        }
      ]
    });
    await alert.present();
  }
}
