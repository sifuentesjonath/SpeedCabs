import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelingPage } from './traveling.page';

const routes: Routes = [
  {
    path: '',
    component: TravelingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelingPageRoutingModule {}
