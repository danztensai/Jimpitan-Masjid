import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CurrencyPipe } from '@angular/common';
import { Globalization } from '@ionic-native/globalization';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the InfaqAllInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-infaq-all-info',
  templateUrl: 'infaq-all-info.html',
})
export class InfaqAllInfoPage {

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
  totalAllTromol:any;
  arrayData:any;
  public dataTotalInfaq : string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
private globalization: Globalization,
private toast: Toast,
public restProvider:RemoteServiceProvider
  ) {

  }

  ionViewDidLoad() {
    this.getLaporanSemuaTromol();
    console.log('ionViewDidLoad InfaqAllInfoPage');
  }

  getLaporanSemuaTromol(){
    this.restProvider.getLaporanGrafikAllTromol()
      .then(data => {
        this.dataGraph = data;
        var labelBulan = [];
        var arrayTotalData = [];
        let dataArray = this.dataGraph.data;
        this.arrayData = this.dataGraph.data;



        console.log('Status   : '+this.dataGraph.status);
        console.log('Message  : '+this.dataGraph.message);
        console.log('Option Barchart : '+this.barChartOptions.responsive);
        console.log(dataArray[0]['bulan']);
        console.log('Length : '+dataArray.length);
        console.log('BeforePush  : '+labelBulan.length);
        console.log('Total All : '+this.dataGraph.total_all);

        this.totalAllTromol = this.dataGraph.total_all;
        this.dataTotalInfaq = this.totalAllTromol;
        for(var i=0;i<dataArray.length;i++)
        {
           labelBulan.push(dataArray[i]['bulan']);
           arrayTotalData.push(dataArray[i]['total']);
        }
         labelBulan.toString();
        console.log('AfterPush  : '+labelBulan.length);
          //this.barChartLabels = labelBulan;
          this.barChartLabels = labelBulan;
          this.barChartData[0]['data'] = arrayTotalData;
      });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65], label: 'Bulan',backgroundColor:'#0000ff'}
  ];

  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#0000ff','#0000ff','#0000ff','#0000ff']
    }
]

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
   }


}
