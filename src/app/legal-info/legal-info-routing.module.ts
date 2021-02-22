import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalInfoPage } from './legal-info.page';

const routes: Routes = [
  {
    path: '',
    component: LegalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalInfoPageRoutingModule {}
