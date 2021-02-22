import { Component, OnInit,AfterViewInit, OnChanges, EventEmitter,Input, ElementRef, Renderer2, Output, SimpleChanges } from '@angular/core';
import { Platform,LoadingController, MenuController,DomController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';//Manejo de cache
import { Router }from '@angular/router';
import { DrawerState } from '../services/Drawer/drawer-state';
//imports services
import * as Hammer from 'hammerjs';

/*import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LocationService,
  MyLocation,
  Geocoder,
  GeocoderResult
} from '@ionic-native/google-maps';*/
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
  constructor(private _element: ElementRef,private _renderer: Renderer2,private _domCtrl: DomController,private _platform: Platform,private router:Router,private storage:Storage,private menu:MenuController) {
    this.menu.enable(false);
  }
  ngOnInit() {
    this.imgP='assets/imgs/perfil.png';
  }
  whatsapp(){                                            
    window.open("https://api.whatsapp.com/send?phone=52"+this.celular,'_system','location=yes');
  }
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
  ngOnChanges(changes: SimpleChanges) {
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
}
