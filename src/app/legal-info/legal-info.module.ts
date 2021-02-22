import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalInfoPageRoutingModule } from './legal-info-routing.module';

import { LegalInfoPage } from './legal-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalInfoPageRoutingModule
  ],
  declarations: [LegalInfoPage]
})
export class LegalInfoPageModule {}
