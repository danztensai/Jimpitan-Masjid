import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { DetailPhotoPage } from '../detail-photo/detail-photo';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the PhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
listAlbum:any;
responseServer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RemoteServiceProvider,public loadingController:LoadingController) {
  this.getAlbum();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPage');
  }
 detailAlbum(albumName)
 {
	 this.navCtrl.push(DetailPhotoPage,{
			albumName: albumName
		});
 }
 getAlbum() {
	 let loading = this.loadingController.create({content : "Fetching Data, Please Wait..."});
    loading.present();
    this.restProvider.getAlbum()
    .then(data => {
		 loading.dismissAll();
      this.responseServer = data;

	  this.listAlbum = this.responseServer.list_album;
      console.log(this.listAlbum);
    });
  }
}
