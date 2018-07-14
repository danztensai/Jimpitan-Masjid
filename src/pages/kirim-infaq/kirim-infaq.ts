import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CurrencyPipe } from '@angular/common';
import { Globalization } from '@ionic-native/globalization';


/**
 * Generated class for the KirimInfaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-kirim-infaq',
  templateUrl: 'kirim-infaq.html',
})
export class KirimInfaqPage {

  nilai1:number = 100000 ;
  lembar1:number = 0 ;
  jumlah1:number = 0;

  nilai2:number = 50000 ;
  lembar2:number = 0 ;
  jumlah2:number = 0 ;

  nilai3:number = 20000 ;
  lembar3:number = 0 ;
  jumlah3:number = 0 ;

  nilai4:number = 10000 ;
  lembar4:number = 0 ;
  jumlah4:number = 0 ;

  nilai5:number = 5000 ;
  lembar5:number = 0 ;
  jumlah5:number = 0 ;

  nilai6:number = 2000 ;
  lembar6:number = 0 ;
  jumlah6:number = 0 ;

  nilai7:number = 1000 ;
  lembar7:number = 0 ;
  jumlah7:number = 0 ;

  nonBundle: number = 0 ;
  jumlahTotal : any ;

  productFound:boolean = false;
  selectedProduct:any;
  dataInfaq:any;
  stsLogin:any;
  kodeBarcode:any;
  stsInfaq:any;
  dataLaporan:any;
  laporanFound:boolean = false;
  currentLoggedinUsername:any;
  testCurrency:any;
  dataGraph:any;
  usernameLogged:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,private globalization: Globalization,
    private barcodeScanner: BarcodeScanner,private toast: Toast,private geolocation: Geolocation,
    public restProvider:RemoteServiceProvider,private alertCtrl: AlertController) {
      	this.stsLogin = localStorage.getItem('statusLogin');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimInfaqPage');
      this.kodeBarcode =   localStorage.getItem('barcodeText');
  }

  kirimDataSetoran(sts,username,noBarcode,jumlah,longt,lat)
  {
  	console.log('Trying To send data Infaq Using :'+noBarcode+'|'+jumlah+'|'+username);
  	this.restProvider.kirimDataSetoran(sts,noBarcode,username,jumlah,longt,lat)
  			.then(data => {
  				var respServer = data;
  			 console.log('resp Code : '+respServer);
  			 this.toast.show('Pengiriman Sukses', '10000', 'center').subscribe(
  								  toast => {
  									console.log(toast);
  								  }
  								);
  			});
  }

  presentPromptStatusRepeat() {
    const alert = this.alertCtrl.create({
      title: 'Submit Infaq',
   message : 'Sudah Ada Setoran Hari ini, Apakah anda yakin akan melakukan Setoran Lagi?',
      inputs: [
        {
          name: 'infaq',
          placeholder: 'Jumlah Infaq',
           value:this.jumlahTotal.toString()
        },

      ],
      buttons: [
     {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Kirim Setoran Infaq',
     role:null,
          handler: data => {
            console.log(data.infaq);
       console.log('Kode Barcode : '+this.kodeBarcode);
       var lat,longt,noBarcode;
       noBarcode = this.kodeBarcode;
          this.geolocation.getCurrentPosition().then((resp) => {
                     console.log('Trying to Get Location For Send Infaq data ');
                      lat = resp.coords.latitude;
                      longt = resp.coords.longitude;
                      console.log('Lat :'+lat);
                      console.log('Longt : '+longt);
                      this.kirimDataSetoran(0,localStorage.getItem('usernameLogin'),noBarcode,data.infaq,longt,lat);
                      this.toast.show('Mengirim Saldo Infaq Ke Server \n Kode Barcode '+noBarcode+'\n Dengan Saldo : '+data.infaq, '10000', 'center').subscribe(
                   toast => {
                   console.log(toast);
                   }
                 );

                     }).catch((error) => {
                       console.log('Error getting location', error);
                   });




          }
        }
      ]
    });
    alert.present();
  }

  presentPromptStatusOk() {
   const alert = this.alertCtrl.create({
     title: 'Submit Infaq',
  inputs: [
       {
         name: 'infaq',
         placeholder: 'Jumlah Infaq',
         value: this.jumlahTotal.toString()
       },

     ],
     buttons: [
    {
         text: 'Cancel',
         role: 'cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Kirim Setoran Infaq',
    role:null,
         handler: data => {
           console.log(data.infaq);
      console.log('Kode Barcode : '+this.kodeBarcode);
      console.log('Jumlah Infaq :'+data.infaq);
      var lat,longt,noBarcode;
      noBarcode = this.kodeBarcode;
       this.geolocation.getCurrentPosition().then((resp) => {
                    console.log('Trying to Get Location For Send Infaq data ');
                     lat = resp.coords.latitude;
                     longt = resp.coords.longitude;
                     console.log('Lat :'+lat);
                     console.log('Longt : '+longt);
                     this.kirimDataSetoran(0,localStorage.getItem('usernameLogin'),noBarcode,data.infaq,longt,lat);
                     this.toast.show('Mengirim Saldo Infaq Ke Server \n Kode Barcode '+noBarcode+'\n Dengan Saldo : '+data.infaq, '10000', 'center').subscribe(
                  toast => {
                  console.log(toast);
                  }
                );

                    }).catch((error) => {
                      console.log('Error getting location', error);
                  });






         }
       }
     ]
   });
   alert.present();
 }

 inputSetoranInfaq()
 {


   console.log('Clicked inputsetoran Infaq with kodeBarcode: '+this.kodeBarcode);
   var total = ((this.nilai1 * this.lembar1) + (this.nilai2 * this.lembar2) + (this.nilai3 * this.lembar3) + (this.nilai4 * this.lembar4) + (this.nilai5 * this.lembar5) + (this.nilai6 * this.lembar6) +
   (this.nilai7 * this.lembar7 ));
   total = total * 1 ;
   this.jumlahTotal = total + (this.nonBundle * 1);


   console.log('Jumlah Total '+this.jumlahTotal);
   if(this.kodeBarcode){
     if(this.stsInfaq==1)
     {
       this.presentPromptStatusRepeat();
     }
     else{
       this.presentPromptStatusOk();
     }
   }else{
          this.toast.show('Tidak ada kode Tromol Silahkan Scan ulang Barcode', '10000', 'center').subscribe(
                   toast => {
                   console.log(toast);
                   }
                 );
   }
 }

}
