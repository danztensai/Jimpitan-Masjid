import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { DetailArtikelPage } from '../detail-artikel/detail-artikel';
import { LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
/**
 * Generated class for the BeritaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-berita',
  templateUrl: 'berita.html',
})
export class BeritaPage {
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



  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RemoteServiceProvider,public loadingController:LoadingController,private sanitizer: DomSanitizer) {

	  //this.getArtikelBerita();
	  this.getArtikel();

  }

  getArtikelBerita() {
	   let loading = this.loadingController.create({content : "Fetching Data,please wait..."});
       loading.present();
    this.restProvider.getArticle('berita')
    .then(data => {
		loading.dismissAll();
      this.responseServer = data;
	  console.log('Response JSON listArtikel:'+this.responseServer.article);
	  this.listArtikel = this.responseServer.article;
      console.log(this.responseServer);
    });
  }

  getArtikel() {
  this.restProvider.getArtikelLoadMore(this.page,'berita')
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
    this.restProvider.getArtikelLoadMore(this.page,'berita')
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

   transformHTML(html)
  {
	 return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeritaPage');
  }

	detailArtikel(artikeId)
	{
		this.navCtrl.push(DetailArtikelPage,{
			artikelId: artikeId
		});
	}


}
