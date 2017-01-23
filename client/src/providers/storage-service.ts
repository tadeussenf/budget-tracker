import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Product} from "../common/Product";

/*
 Generated class for the StorageService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class StorageService {

  constructor(private http: Http,
              private storage: Storage) {
  }

  saveInitialData() {
    this.getItem('first_run').then((value) => {
      if (value !== "true") {
        let items: Product[] = [
          {
            productName: "Coffee-To-Go",
            price: 3.99,
            category: "ToGo",
            date: new Date("2016-12-16T17:17:36.675Z"),
            shopAdress: "Schmidener Straße 227, 70374 Stuttgart",
            shopName: "Bäckerei Stefansbäck"
          },
          {
            productName: "Coffee-To-Go",
            price: 2.99,
            category: "ToGo",
            date: new Date("2016-11-16T17:17:36.675Z"),
            shopAdress: "Schmidener Straße 227, 70374 Stuttgart",
            shopName: "Bäckerei Stefansbäck"
          },
          {
            productName: "Coffee-To-Go",
            price: 1.99,
            category: "ToGo",
            date: new Date("2016-10-16T17:17:36.675Z"),
            shopAdress: "Schmidener Straße 227, 70374 Stuttgart",
            shopName: "Bäckerei Stefansbäck"
          },
          {
            productName: "Pullover",
            price: 29.95,
            category: "Kleidung",
            date: new Date("2016-12-16T17:17:36.675Z"),
            shopAdress: "Schmidener Straße 227, 70374 Stuttgart",
            shopName: "Aldi"
          },
          {
            productName: "Pullover",
            price: 29.95,
            category: "Kleidung",
            date: new Date("2016-12-16T17:19:36.675Z"),
            shopAdress: "Schmidener Straße 227, 70374 Stuttgart",
            shopName: "Aldi"
          }

        ];

        let categories = ["ToGo", "Kleidung", "Lebensmittel", "Restaurant", "Bar", "Lieferservice"];

        this.setItem('items', items).then(() => {
          this.setItem('categories', categories).then(() => {
            this.setItem('first_run', 'true').then((data) => {
              console.log(data);
              console.log('App is running for the first time, generating example data');
              location.reload();
            });

          });

        });
      }
    });
  }

  setItem(key: string, obj: any) {
    return this.storage.set(key, obj);
  }

  pushItem(key: string, obj: Product): Promise<any> {
    return this.storage.get(key).then((value) => {
      value.push(obj);
      return this.storage.set(key, value);
    });
  }


  getItem(key: string) {
    return this.storage.get(key);
  }

  removeItem(key, id: Date) { // unique id is Date
    return this.storage.get(key).then((value) => {
      let result = value.filter((e: Product) => {
        return JSON.stringify(e.date) !== JSON.stringify(id);
      });
      return this.storage.set(key, result);
    });
  }
}
