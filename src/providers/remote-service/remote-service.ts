import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
apiUrl = 'http://122.129.112.169/saptadi/muhajirin';

 constructor(public http: HttpClient,public httpC: Http) {
  console.log('Hello RestServiceProvider Provider');
}




getArtikelLoadMore(page,tipe): Observable<string[]> {
  return this.httpC.get(this.apiUrl+'/artikel_edit/daftar_deskripsi/'+page+'/'+tipe)
                  .map(this.extractData)
                  .catch(this.handleError);
}

private extractData(res: Response) {
  let body = res.json();
  return body || { };
}
private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = '${error.status} - ${error.statusText || \'\'} ${err}';
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}
getArticle(artikelType) {
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/artikel/daftar_deskripsi/0/'+artikelType).subscribe(data => {
      resolve(data);
	  console.log('jsonResponseGetArtikel : '+data);
    }, err => {
      console.log(err);
    });
  });
}
getAlbum() {
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/artikel/list_album').subscribe(data => {
      resolve(data);
	  console.log('jsonResponseGetAlbum '+data);
    }, err => {
      console.log(err);
    });
  });
}


getPhotoByAlbum(albumName)
{
	 return new Promise(resolve => {
    this.http.get(this.apiUrl+'/artikel/list_photo/0/'+albumName).subscribe(data => {
      resolve(data);
	  console.log('jsonResponseGetAlbum '+data);
    }, err => {
      console.log(err);
    });
  });
}

login(username,password)
{
	return new Promise(resolve => {
    this.http.get(this.apiUrl+'/artikel/login_app/'+username+'/'+password).subscribe(data => {
      resolve(data);
	  console.log('jsonResponseLogin '+data);
    }, err => {
      console.log(err);
    });
   });
}
getListVideo()
{
	return new Promise(resolve => {
    this.http.get(this.apiUrl+'/artikel/list_video/0').subscribe(data => {
      resolve(data);
	  console.log('JsongetListVideo '+data);
    }, err => {
      console.log(err);
    });
   });
}

kirimDataSetoran(sts,noBarcode,username,jumlah,longt,lat)
{
	var url = this.apiUrl+'/tromol/setor_tromol/'+sts+'/'+noBarcode+'/'+username+'/'+jumlah+'/'+longt+'/'+lat;
	console.log('Url KirimSetoran : '+url);
	return new Promise(resolve => {
    this.http.get(url).subscribe(data => {
      resolve(data);
	  console.log('jsonResponseKirimDataSetoran '+data);
    }, err => {
      console.log(err);
    });
   });
}

getDetailArtikel(artikelId)
{
	return new Promise(resolve => {
    this.http.get(this.apiUrl+'/artikel/buka_artikel/'+artikelId).subscribe(data => {
      resolve(data);
	  console.log('jsonResponseGetArtikelDetail '+data);
    }, err => {
      console.log(err);
    });
  });
}


getLaporanUsername(username)
{
	return new Promise(resolve => {
			this.http.get(this.apiUrl+'/tromol/cek_setoran/'+username).subscribe(data => {
			  resolve(data);
			  console.log('UsernameData '+username);
			  console.log('Data response : '+data);
			}, err => {
			  console.log(err);
			});
		  });
}

	getLaporanTromol(barcodeData)
	{
		return new Promise(resolve => {
			this.http.get(this.apiUrl+'/tromol/cek_tromol/'+barcodeData).subscribe(data => {
			  resolve(data);
			  console.log('Barcode Data : '+barcodeData);
			  console.log('Data response : '+data);
			}, err => {
			  console.log(err);
			});
		  });
	}
}
