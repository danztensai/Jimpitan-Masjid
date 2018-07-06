import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailArtikelPage } from './detail-artikel';

@NgModule({
  declarations: [
    DetailArtikelPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailArtikelPage),
  ],
})
export class DetailArtikelPageModule {}
