import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { DetailArtikelPage } from '../detail-artikel/detail-artikel';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the DakwahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-dakwah',
  templateUrl: 'dakwah.html',
})
export class DakwahPage {
listArtikel:any;
responseServer:any;
detailArtikelPage = DetailArtikelPage;

data: any;
artikel: string[];
errorMessage: string;
page = 0;
perPage = 0;
totalData = 0;
totalPage = 0;

  constructor(public navCtrl: NavController,public loadingController:LoadingController, public navParams: NavParams,public restProvider:RemoteServiceProvider,private sanitizer: DomSanitizer) {
  // this.getArtikelBerita();
  this.getArtikel();
  }
  transformHTML(html)
  {
	 return this.sanitizer.bypassSecurityTrustHtml(html);
  }
 getArtikelBerita() {
    this.restProvider.getArticle('dakwah')
    .then(data => {
      this.responseServer = data;
	  console.log('Response JSON listArtikelDakwah:'+this.responseServer.article);
	  this.listArtikel = this.responseServer.article;
      console.log(this.responseServer);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DakwahPage');
  }

  getArtikel() {
	  let loading = this.loadingController.create({content : "Fetching Data,please wait..."});
  this.restProvider.getArtikelLoadMore(this.page,'dakwah')
     .subscribe(
       res => {
         this.data = res;
         this.artikel = this.data.article;
         this.perPage = this.data.per_page;
         this.totalData = this.data.total;
         this.totalPage = this.data.total_pages;
       },
       error =>  this.errorMessage = <any>error);
}
  doInfinite(infiniteScroll) {
  this.page = this.page+1;
  console.log('Get Page'+this.page);
  setTimeout(() => {
    this.restProvider.getArtikelLoadMore(this.page,'dakwah')
       .subscribe(
         res => {
           this.data = res;
           this.perPage = this.data.per_page;
           this.totalData = this.data.total;
           this.totalPage = this.data.total_pages;
           for(let i=0; i<this.data.article.length; i++) {
             this.artikel.push(this.data.article[i]);
           }
         },
         error =>  this.errorMessage = <any>error);

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 1000);
}
  detailArtikel(artikeId)
  	{
  		this.navCtrl.push(DetailArtikelPage,{
  			artikelId: artikeId
  		});
  	}

}
