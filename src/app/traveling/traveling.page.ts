import { Component, OnInit,AfterViewInit, OnChanges, EventEmitter,Input, ElementRef, Renderer2, Output, SimpleChanges,NgZone } from '@angular/core';
import { Platform,LoadingController, MenuController,DomController } from '@ionic/angular';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { DrawerState } from '../services/Drawer/drawer-state';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
//imports services
import * as Hammer from 'hammerjs';
import { SocialMediaService} from '../services/Media/social-media.service';
import { MessagesService } from '../services/Messages/messages.service';

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
  cliente:String;
  idConductor=String;
  idV:String;
  imgP:String='';
  conductor:String='';
  modelo:String='';
  placas:String='';
  costo:String='';
  destino:String='';
  origen:String='';
  celular:String='';
  txtCosto:String='';
  mensajeT:String='En Espera...';
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
  constructor(private message:MessagesService,private geolocation:Geolocation,private zone: NgZone,private social:SocialMediaService,private _element: ElementRef,private _renderer: Renderer2,private _domCtrl: DomController,private _platform: Platform,private router:Router,private storage:Storage,private menu:MenuController) {
    this.menu.enable(false);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }
  async ngOnInit() {
    this.imgP='assets/imgs/perfil.png';
    await this.loadMap();
  }
  //ngOnDestroy(){}
  ngAfterViewInit() {
    /*const hammer = new Hammer(this._element.nativeElement);
    hammer.on('pan panstart panend', (ev: any) => {
    this._handlePanEnd(ev);
    });*/
    /*this._renderer.setStyle(this._element.nativeElement.querySelector('.ion-bottom-drawer-scrollable-content :first-child'),
      'touch-action', 'none');
    this._setDrawerState(this.state);*/

    /*const hammer = new Hammer(this._element.nativeElement);
    hammer.get('pan').set({ enable: true, direction: Hammer.DIRECTION_VERTICAL });
    hammer.on('pan panstart panend', (ev: any) => {
      if (this.disableDrag) {
        return;
      }

      switch (ev.type) {
        case 'panstart':
          this._handlePanStart();
          break;
        case 'panend':
          this._handlePanEnd(ev);
          break;
        default:
          this._handlePan(ev);
      }
    });*/
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
      origin: that.myLantLng,
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
    this.social.whatsapp_user(this.celular);
  }
  private cancel(){
    //if(this.cliente!=null && this.conductor!=null&&this.idV!=null){
      this.message.loading_proccess();
      setTimeout(() => {
        this.message.dismiss_loding();
        this.router.navigate(['/home']);
        //remove();
      },1000);
    //}

    /*if(this.cliente!=null && this.conductor!=null&&this.idV!=null){
      this.storage.get('Id').then((resI) => { 
      this.storage.get('confirmador').then((res0) => {
        let loading = this.loadingCtrl.create({
          content: 'Procesando...'
        });
        loading.present(); 
        var url = 'http://citcar.relatibyte.mx//mobile/Api/connectCitCar/cancel_travel.php';
        let body=JSON.stringify({id:this.idV,conductor:this.conductor,cliente:this.cliente});
        this.http.post(url,body).subscribe(res => {
          setTimeout(() => {
            if(res===0){
              let error = this.alertCtrl.create({
              title: 'Error',
              message:"Falló al intentar de cancelar viaje,vuelva a intentarlo otra vez.",
              buttons: ['Entendido']
              });
              error.present();               
              loading.dismiss();
            }      
            else if(res===1){
              this.storage.clear();
              this.storage.set('NombreC',this.cliente);
              this.storage.set('confirmador',resI);
              this.storage.set('Id',res0);
              const exito = this.toastCtrl.create({
                    message:'Viaje cancelado',
                    duration: 1000,
                    position:'middle'
              });
              exito.present();
              loading.dismiss();
              let currentIndex = this.navCtrl.getActive().index;
              this.navCtrl.push(HomePage).then(() => {
                  this.navCtrl.remove(currentIndex);
              });                                     
            }
            else{
              var exito = this.alertCtrl.create({
                title: 'Error',
                message:"Acceso denegado.",
                buttons: ['Entendido']
                });
                exito.present();
                loading.dismiss();
            }
          },3000);
        });
      });
      });
    }*/ 
  }
}
