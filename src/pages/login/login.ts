import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Toast } from '@ionic-native/toast';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loginData = {username:'',password:''};
	data:any;
	responseServer:any;
	stsLogin : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider:RemoteServiceProvider, private toast: Toast) {
   this.stsLogin =  localStorage.getItem('statusLogin');

   console.log("stsLogin loh : "+this.stsLogin);
   console.log(localStorage.getItem('usernameLogin'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin()
  {
	  console.log(this.loginData.username);
	  console.log(this.loginData.password);
	   this.restProvider.login(this.loginData.username,this.loginData.password)
			.then(data => {
			  this.responseServer = data;
			  console.log('Response JSON doLogin:'+this.responseServer.code);
			  if(this.responseServer.code==1)
			  {
				   console.log('Login Failed');
				   this.toast.show('Login Failed', '5000', 'center').subscribe(
						  toast => {
							console.log(toast);
						  }
						);


			  }else{
				  console.log('Login Success');
				  localStorage.setItem('statusLogin','0');
				  localStorage.setItem('usernameLogin',this.loginData.username);
				    this.navCtrl.setRoot(HelloIonicPage);
			  }

			});
  }
  doLogout()
  {
	  localStorage.setItem('statusLogin','1');
	  this.stsLogin = '1';
	  localStorage.removeItem('usernameLogin');
	  this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }
}
