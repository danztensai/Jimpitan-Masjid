import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfaqPage } from '../infaq/infaq';
import { PhotoPage } from '../photo/photo';
import { InfaqAllInfoPage } from '../infaq-all-info/infaq-all-info';
import { InfaqPeruserPage } from '../infaq-peruser/infaq-peruser';

/**
 * Generated class for the InfaqInfoTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-infaq-info-tab',
  templateUrl: 'infaq-info-tab.html',
})
export class InfaqInfoTabPage {
  tab1Root = InfaqPage;
  tab2Root = InfaqAllInfoPage;
  tab3Root = InfaqPeruserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfaqInfoTabPage');
  }

}
