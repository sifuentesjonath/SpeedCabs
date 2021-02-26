import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
//Services
import { Aes256Service } from './services/AES-256/aes-256.service';
import { MessagesService } from './services/Messages/messages.service';
import { IonBottomDrawerService } from './services/Drawer/ion-bottom-drawer.service';
import { FirebaseService } from './services/Firebase/firebase.service';
import { AuthenticationService}from './services/Authentication/authentication.service';
//special modules
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
//Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule,SETTINGS } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
//Google Maps
import { Geolocation} from '@ionic-native/geolocation/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    IonBottomDrawerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    Aes256Service,
    MessagesService,
    FirebaseService,
    AuthenticationService,
    IonBottomDrawerService,
    StatusBar,
    SplashScreen,
    AppVersion,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //{ provide: SETTINGS, useValue: {} }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
