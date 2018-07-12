import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfaqInfoTabPage } from './infaq-info-tab';

@NgModule({
  declarations: [
    InfaqInfoTabPage,
  ],
  imports: [
    IonicPageModule.forChild(InfaqInfoTabPage),
  ],
})
export class InfaqInfoTabPageModule {}
