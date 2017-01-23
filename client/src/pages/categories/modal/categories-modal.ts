import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageService} from "../../../providers/storage-service";

@Component({
  selector: 'categories-modal',
  templateUrl: 'categories-modal.html'
})
export class CategoriesModal implements OnInit {
  model: string[];
  categories: string[];
  category: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: StorageService,
              public viewCtrl: ViewController) {
    console.log('init modal');
  }

  ngOnInit() {
    this.storage.getItem('categories').then((categories) => {
      this.categories = categories;
    });
  }

  dismiss(model) {
    console.log("dismissed");
    this.viewCtrl.dismiss(model);
  }

  addCategory(category) {
    this.storage.pushItem('categories', category).then(() => {
      this.categories.push(category);
    });

    this.category = null;
  }
}
