import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
/**
 * Generated class for the DetailArtikelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail-artikel',
  templateUrl: 'detail-artikel.html',
})
export class DetailArtikelPage {
responseServer:any;
public artikelId;
isiArtikel:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RemoteServiceProvider,private sanitizer: DomSanitizer) {
	  this.artikelId = navParams.get('artikelId');
	  this.getArtikelDetail(this.artikelId);
  }
  transformHTML(html)
  {
	 return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getArtikelDetail(artikelId) {
    this.restProvider.getDetailArtikel(artikelId)
    .then(data => {
      this.responseServer = data;
	  console.log('Response JSON isi_artikel:'+data);
	  this.isiArtikel = this.responseServer.isi_artikel;

      console.log('Response JSON Server : '+this.responseServer);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailArtikelPage');
  }

}
