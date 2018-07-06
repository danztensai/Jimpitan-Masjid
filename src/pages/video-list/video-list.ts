import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { VideoPage } from '../video/video';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the VideoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-list',
  templateUrl: 'video-list.html',
})
export class VideoListPage {
listVideo:any;
responseServer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RemoteServiceProvider,private sanitizer: DomSanitizer,public loadingController:LoadingController) {
  this.getListVideo();
  }
 transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  transformHTML(html)
  {
	 return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  getListVideo() {
	    let loading = this.loadingController.create({content : "Fetching Data ,please wait..."});
    loading.present();
    this.restProvider.getListVideo()
    .then(data => {
		 loading.dismissAll();
      this.responseServer = data;
	  
	  this.listVideo = this.responseServer.list_video;
	  
      console.log(this.responseServer);
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoListPage');
  }

}
