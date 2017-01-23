import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageService} from "../../../providers/storage-service";
import * as _ from 'lodash';
// import {Product} from "../../../common/Product";
import {CategoriesPage} from "../categories";
import {Product} from "../../../common/Product";
import {AddPage} from "../../add/add";

@Component({
  selector: 'categories-detail',
  templateUrl: '../../home/home.html'
})
export class CategoriesDetail implements OnInit {
  viewTitle: string;

  items: any;
  category: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: StorageService,
              public viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (!this.navParams.get('category')) {
      this.navCtrl.push(CategoriesPage)
    } else {
      this.category = this.navParams.get('category');
      this.viewTitle = this.category;

      this.storage.getItem('items').then((items) => {
        this.items = _.groupBy(items, 'category')[this.category];
      });

    }


  }

  onRemove(date: Date) {
    this.storage.removeItem('items', date).then(() => {
      this.ngOnInit();
    });
  }

  addItem(item: Product) {
    this.navCtrl.push(AddPage, {item: item});
  }
}
