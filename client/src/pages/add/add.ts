import {Component, OnInit, Input} from '@angular/core';
import {NavController, NavParams, ModalController, Platform} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Toast} from 'ionic-native';
import {Product} from "../../common/Product";
import {StorageService} from "../../providers/storage-service";
import {HomePage} from "../home/home";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {CategoriesModal} from "../categories/modal/categories-modal";
import {Http} from "@angular/http";

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage implements OnInit {
  @Input() addItemForm: FormGroup;
  lat: string;
  lng: string;
  model: Product; // Product
  categories: string[];
  focusModel: any = {
    productName: false,
    price: false,
    category: false
  };

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private storage: StorageService,
              private http: Http,
              public modalCtrl: ModalController,
              private platform: Platform,
              private formBuilder: FormBuilder) {
    this.model = navParams.get('item') || {};

    this.addItemForm = this.formBuilder.group({
      productName: [this.model.productName, Validators.compose([Validators.required])],
      price: [parseFloat(<any>this.model.price), Validators.compose([Validators.required])],
      date: [new Date(), Validators.compose([Validators.required])],
      category: [this.model.category, Validators.compose([])],
      shopAdress: [this.model.shopAdress, Validators.compose([])],
      shopName: [this.model.shopName, Validators.compose([])],
      longitude: [this.model.longitude, Validators.compose([])],
      latitude: [this.model.latitude, Validators.compose([])],
    });
  }

  ngOnInit() {
    this.storage.getItem('categories').then((categories) => {
      this.categories = categories;
      this.getGeolocation();
    })
  }

  getGeolocation() {
    if (navigator.geolocation) {
      // Will use navigator.geolocation if it exists
      Geolocation
      .getCurrentPosition({
        maximumAge: 0, timeout: 15000, enableHighAccuracy: true
      })
      .then((result: any) => {
        let longitudeControl = <FormGroup>this.addItemForm.controls['longitude'];
        longitudeControl.setValue(result.coords.longitude);
        let latitudeControl = <FormGroup>this.addItemForm.controls['latitude'];
        latitudeControl.setValue(result.coords.latitude);

        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;

        this.http.post('https://rly.lepus.uberspace.de/budget/api/test/location', {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude
        })
        .subscribe((res: any) => {
          res = JSON.parse(res._body);
          console.log(res);
          if (res.status === "ZERO_RESULTS") {
            console.log("true");
            let shopNameControl = <FormGroup>this.addItemForm.controls['shopName'];
            shopNameControl.setValue(<any>"Kein Geschäft im Umkreis gefunden");
          }

          if (res.status === "OK" && res.results) {

            let shopAdressControl = <FormGroup>this.addItemForm.controls['shopAdress'];
            shopAdressControl.setValue(res.results[0].vicinity);

            let shopNameControl = <FormGroup>this.addItemForm.controls['shopName'];
            shopNameControl.setValue(res.results[0].name);
          } else {
            console.log('error retrieving current location\'s name');
          }
        });
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  }

  showCategoryModal() {
    let categoryModal = this.modalCtrl.create(CategoriesModal, {}, {});
    categoryModal.onDidDismiss((category) => {
      let categoryControl = <FormGroup>this.addItemForm.controls['category'];
      categoryControl.setValue(category);
    });
    categoryModal.present();
  }

  onFocus(input) {
    console.log('onfocus');
    this.focusModel[input] = true;
  }

  onBlur(input) {
    this.focusModel[input] = false;
  }

  onSubmit() {
    //todo: form validation?
    console.log("submit");
    this.addItemForm.value.price = parseFloat(this.addItemForm.value.price);
    this.storage.pushItem('items', this.addItemForm.value).then((value) => {
      if (this.platform.is('cordova')) {
        Toast.show("Einkauf gespeichert", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }

      this.navCtrl.push(HomePage); // todo: go to rootpage, don't push homepage

    });
  }

}
