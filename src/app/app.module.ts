import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { InfaqPage } from '../pages/infaq/infaq';
import { PhotoPage } from '../pages/photo/photo';
import { SekitarKitaPage } from '../pages/sekitar-kita/sekitar-kita';
import { BeritaPage } from '../pages/berita/berita';
import { DakwahPage } from '../pages/dakwah/dakwah';
import { DetailArtikelPage } from '../pages/detail-artikel/detail-artikel';
import { LoginPage } from '../pages/login/login';
import { VideoListPage } from '../pages/video-list/video-list';
import { VideoPage } from '../pages/video/video';
import { DetailPhotoPage } from '../pages/detail-photo/detail-photo';
import { InfaqInfoTabPage } from '../pages/infaq-info-tab/infaq-info-tab';
import { InfaqAllInfoPage } from '../pages/infaq-all-info/infaq-all-info';
import { InfaqPeruserPage } from '../pages/infaq-peruser/infaq-peruser';
import { KirimInfaqPage } from '../pages/kirim-infaq/kirim-infaq';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';


import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { HttpModule } from '@angular/http';
import { Globalization } from '@ionic-native/globalization';
import { SeparatorPipe } from '../pipes/separator/separator';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	InfaqPage,
	PhotoPage,BeritaPage,SekitarKitaPage,DakwahPage,DetailArtikelPage,LoginPage,VideoListPage,VideoPage,DetailPhotoPage,
  SeparatorPipe,
  InfaqInfoTabPage,InfaqAllInfoPage,InfaqPeruserPage,KirimInfaqPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpClientModule,IonicImageViewerModule ,HttpModule,ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
	InfaqPage,
	PhotoPage,BeritaPage,SekitarKitaPage,DakwahPage,DetailArtikelPage,LoginPage,VideoListPage,VideoPage,DetailPhotoPage,InfaqInfoTabPage,InfaqAllInfoPage,
  InfaqPeruserPage,KirimInfaqPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
	BarcodeScanner,
	Toast,Geolocation,Globalization

  ]
})
export class AppModule {}
