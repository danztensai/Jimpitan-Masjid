import { Component } from '@angular/core';
import { SekitarKitaPage } from '../sekitar-kita/sekitar-kita';
import { BeritaPage } from '../berita/berita';
import { DakwahPage } from '../dakwah/dakwah';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  tab1Root = BeritaPage;
  tab2Root = DakwahPage;
  tab3Root = SekitarKitaPage;
  constructor() {

  }
}
