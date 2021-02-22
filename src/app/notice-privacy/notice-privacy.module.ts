import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticePrivacyPageRoutingModule } from './notice-privacy-routing.module';

import { NoticePrivacyPage } from './notice-privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticePrivacyPageRoutingModule
  ],
  declarations: [NoticePrivacyPage]
})
export class NoticePrivacyPageModule {}
