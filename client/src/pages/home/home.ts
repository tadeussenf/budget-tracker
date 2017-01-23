import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
import {Product} from "../../common/Product";
import {StorageService} from "../../providers/storage-service";
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  items: Product[]; // Product
  viewTitle: string = 'Budget Tracker';

  constructor(public navCtrl: NavController,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.storage.getItem('items').then((items: Product[]) => {
      this.items = _.orderBy(items, ['date'], ['desc']);
    });
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
