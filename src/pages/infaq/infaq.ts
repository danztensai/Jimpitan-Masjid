import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CurrencyPipe } from '@angular/common';
import { Globalization } from '@ionic-native/globalization';
/**
 * Generated class for the InfaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infaq',
  templateUrl: 'infaq.html',
})
export class InfaqPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private globalization: Globalization,private barcodeScanner: BarcodeScanner,private toast: Toast,private geolocation: Geolocation,public restProvider:RemoteServiceProvider,private alertCtrl: AlertController) {
	this.stsLogin = localStorage.getItem('statusLogin');
	this.testCurrency = 22000300;
	console.log(this.stsLogin);
	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfaqPage');
  }
  
 getLaporanInfaq()
 {
	 this.restProvider.getLaporanUsername(localStorage.getItem('usernameLogin'))
			.then(data => {
			  this.dataLaporan = data;
			  this.laporanFound=true;
			  this.currentLoggedinUsername = localStorage.getItem('usernameLogin');
			 this.globalization.getPreferredLanguage()
				  .then(res => console.log('Globalization :'+res.value))
				  .catch(e => console.log('Eror Globalization :'+e.value));
			
			  console.log('Laporan Total Infaqnya :'+this.dataLaporan.total);
			});
 }
  

inputSetoranInfaq()
{
	
	console.log('Clicked inputsetoran Infaq with kodeBarcode: '+this.kodeBarcode);
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
 presentPromptStatusOk() {
  const alert = this.alertCtrl.create({
    title: 'Submit Infaq',
	inputs: [
      {
        name: 'infaq',
        placeholder: 'Jumlah Infaq'
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
presentPromptStatusRepeat() {
  const alert = this.alertCtrl.create({
    title: 'Submit Infaq',
	message : 'Sudah Ada Setoran Hari ini, Apakah anda yakin akan melakukan Setoran Lagi?',
    inputs: [
      {
        name: 'infaq',
        placeholder: 'Jumlah Infaq'
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

 scan() {
    var lat;
	var longt;
    this.barcodeScanner.scan().then((barcodeData) => {
    
        
        this.toast.show('Kode Barcode '+barcodeData.text, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
		
		
		var barcodeText=barcodeData.text;
		this.kodeBarcode = barcodeText;
		this.restProvider.getLaporanTromol(barcodeText)
			.then(data => {
			  this.dataInfaq = data;
			  this.productFound=true;
			  this.stsInfaq = this.dataInfaq.status;
			  console.log('INLOH data Infaqnya '+this.dataInfaq.total);
			 
			});
      
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
	
  }
}
