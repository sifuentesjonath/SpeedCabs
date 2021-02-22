import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelingPageRoutingModule } from './traveling-routing.module';
import { TravelingPage } from './traveling.page';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelingPageRoutingModule,
    IonBottomDrawerModule
  ],
  declarations: [TravelingPage],
  exports: [],

})
export class TravelingPageModule {}
