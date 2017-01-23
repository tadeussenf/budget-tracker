import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageService} from "../../providers/storage-service";
import {CategoriesDetail} from "./detail/categories-detail";
import * as _ from 'lodash';
import {Product} from "../../common/Product";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage implements OnInit {
  model: string[];
  items: Product[];
  categories: any;
  category: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: StorageService,
              public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.categories = [];
    this.storage.getItem('items').then((items) => {
      this.items = items;

      this.storage.getItem('categories').then((categories) => {
        _.forEach(categories, (category) => {
          this.categories.push({name: category, number: this.getNumberOfItems(category)})
        });
      });
    })
  }

  getNumberOfItems(category) {
    return _.filter(this.items, {'category': category}).length
  }

  onClick(category) {
    this.navCtrl.push(CategoriesDetail, {category: category});
  }
}
