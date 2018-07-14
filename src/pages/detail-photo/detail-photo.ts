import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Toast } from '@ionic-native/toast';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the DetailPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detail-photo',
  templateUrl: 'detail-photo.html',
})
export class DetailPhotoPage {
public albumName;
listPhoto:any;
responseServer:any;
grid: Array<Array<string>>;
photoStatus: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RemoteServiceProvider,private toast: Toast,public alertCtrl: AlertController) {
	this.albumName = navParams.get('albumName');
	this.getPhotoByAlbum(this.albumName);



 }
getPhotoByAlbum(albumName) {
    this.restProvider.getPhotoByAlbum(albumName)
    .then(data => {
      this.responseServer = data;
	  console.log('Response JSON isiAlbum '+albumName+':'+data);

	  this.listPhoto = this.responseServer.list_photo;
	  this.grid = Array(Math.ceil(this.responseServer.count/2));
	  console.log('length of list_photo : '+this.responseServer.list_photo.length);
	 if(this.responseServer.list_photo.length==0)
	 {
		 this.photoStatus=false;

			  const alert = this.alertCtrl.create({
				title: 'Attention',
				subTitle: 'No Photo',
				buttons: ['Dismiss']
			  });
			  alert.present();

	 }
      console.log('Response JSON Server : '+this.listPhoto);
	  var counter=0;
	  let rowNum = 0


	 for(let i=0;i<this.responseServer.count;i+=2)
	   {

		   console.log(rowNum);
		   this.grid[rowNum]=Array(1);
		   if(this.listPhoto[i].image){
			this.grid[rowNum][0]=this.listPhoto[i].image;
			}
			console.log('Counter ke : '+(i+1));
			if (typeof this.listPhoto[i+1] != "undefined")
			{
				if(this.listPhoto[i+1].image){
				   this.grid[rowNum][1]=this.listPhoto[i+1].image;
				   }
			}



		   rowNum++;
	   }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPhotoPage oi');
	let rowNum = 0;

  }

}
