import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatisticPage} from '../pages/statistic/statistic';
import {AddPage} from "../pages/add/add";
import {APP_BASE_HREF} from "@angular/common";
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import {ChartsModule} from 'ng2-charts/components/charts/charts';
import {StorageService} from "../providers/storage-service";
import {CategoriesPage} from "../pages/categories/categories";
import {CategoriesModal} from "../pages/categories/modal/categories-modal";
import {CategoriesDetail} from "../pages/categories/detail/categories-detail";

export const deepLinkConfig: DeepLinkConfig = {
  links: [
    {component: HomePage, name: 'Start', segment: ''},
    {component: AddPage, name: 'Neuen Einkauf hinzufügen', segment: 'add'},
    {component: CategoriesPage, name: 'Kategorien', segment: 'categories'},
    {component: CategoriesDetail, name: 'Details', segment: 'categories/detail'},
    {component: CategoriesModal, name: 'Kategorien', segment: 'modal'},
    {component: StatisticPage, name: 'Statistik', segment: 'statistic'},
  ]
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    StatisticPage,
    CategoriesPage,
    CategoriesModal,
    CategoriesDetail
  ],
  imports: [
    ChartsModule,
    // todo: use 'path' for html5Mode
    IonicModule.forRoot(MyApp, {
      locationStrategy: 'hash'
    }, deepLinkConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    StatisticPage,
    CategoriesPage,
    CategoriesModal,
    CategoriesDetail,
  ],
  providers: [
    Storage,
    StorageService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }

  ]
})
export class AppModule {
}
