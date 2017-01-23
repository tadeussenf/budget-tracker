import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {StatisticPage} from '../pages/statistic/statistic';
import {StorageService} from "../providers/storage-service";
import {CategoriesPage} from "../pages/categories/categories";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              private storage: StorageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Start', component: HomePage},
      {title: 'Kategorien', component: CategoriesPage},
      {title: 'Statistiken', component: StatisticPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault(); // todo only if mobile platform
      Splashscreen.hide(); // todo only if mobile platform
      this.storage.saveInitialData();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
