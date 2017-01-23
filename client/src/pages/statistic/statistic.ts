import {Component, OnInit, ViewChild, ElementRef, Renderer} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {StorageService} from "../../providers/storage-service";
import {Product} from "../../common/Product";
import * as _ from 'lodash';

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage implements OnInit {
  @ViewChild('barChart') barChart: ElementRef;
  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('shopPieChart') shopPieChart: ElementRef;

  segmentedControl: string = "pieChart";
  items: Product[];
  categories: string[];

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie'; // type of chart to use, not it's name :)

  public shopPieChartLabels: string[];
  public shopPieChartData: number[];
  public shopPieChartType: string = 'pie'; // type of chart to use, not it's name :)

  public barChartType = 'bar';
  public barChartLegend: boolean = true;
  public barChartLabels: string[] = [];
  public barChartData: any[] = [{data: [], label: ''}];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: StorageService,
              private rd: Renderer) {
  }

  ngOnInit() {
    this.storage.getItem('items').then((items) => {
      this.items = items;
      this.buildPieChart();
      this.buildShopPieChart();
      this.buildBarChart();
    });
  }

  onShare() {
    SocialSharing.share('message', 'subject', this[this.segmentedControl].nativeElement.toDataURL())
  }

  buildPieChart() {
    let labels = [];
    let data = [];

    let obj: any = _.groupBy(this.items, (item) => {
      return item.category;
    });

    _.forEach(obj, (item, category) => {
      labels.push(category);
      data.push(_.sumBy(item, 'price'));
    });

    this.pieChartLabels = labels;
    this.pieChartData = data;
  }

  buildShopPieChart() {
    let labels = [];
    let data = [];

    let obj: any = _.groupBy(this.items, (item) => {
      return item.shopName;
    });

    _.forEach(obj, (shop, shopName) => {
      labels.push(shopName);
      data.push(_.sumBy(shop, 'price'));
    });

    this.shopPieChartLabels = labels;
    this.shopPieChartData = data;
  }

  buildBarChart() {
    this.barChartLabels = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    this.barChartData = [];

    let obj: any = _.groupBy(this.items, (item) => {
      return item.category;
    });

    _.forEach(obj, (item, categoryKey) => {
      let months: any = _.groupBy(item, (item: any) => {
        return new Date(item.date).getMonth();
      });

      let sums = [];
      _.forEach(months, (item, monthKey) => {
        sums[monthKey] = _.sumBy(item, 'price');
      });

      this.barChartData.push({
        data: sums,
        label: categoryKey
      });

    });
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
