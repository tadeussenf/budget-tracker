"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var ionic_native_2 = require('ionic-native');
var home_1 = require("../home/home");
var forms_1 = require("@angular/forms");
var categories_modal_1 = require("../categories/modal/categories-modal");
var AddPage = (function () {
    function AddPage(navCtrl, navParams, storage, http, modalCtrl, platform, 
        // public geolocation: Geolocation,
        formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.focusModel = {
            productName: false,
            price: false,
            category: false
        };
        this.model = navParams.get('item') || {};
        this.addItemForm = this.formBuilder.group({
            productName: [this.model.productName, forms_1.Validators.compose([forms_1.Validators.required])],
            price: [this.model.price, forms_1.Validators.compose([forms_1.Validators.required])],
            date: [new Date(), forms_1.Validators.compose([forms_1.Validators.required])],
            category: [this.model.category, forms_1.Validators.compose([])],
            shopAdress: [this.model.shopAdress, forms_1.Validators.compose([])],
            shopName: [this.model.shopName, forms_1.Validators.compose([])],
            longitude: [this.model.longitude, forms_1.Validators.compose([])],
            latitude: [this.model.latitude, forms_1.Validators.compose([])]
        });
    }
    AddPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getItem('categories').then(function (categories) {
            _this.categories = categories;
            _this.getGeolocation();
            console.log(navigator);
        });
    };
    // todo: abstract me away in some service
    AddPage.prototype.getGeolocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            // Will use navigator.geolocation if it exists
            ionic_native_1.Geolocation
                .getCurrentPosition({
                maximumAge: 0, timeout: 15000, enableHighAccuracy: true
            })
                .then(function (result) {
                console.log('coordinates');
                console.log(result);
                var longitudeControl = _this.addItemForm.controls['longitude'];
                longitudeControl.setValue(result.coords.longitude);
                var latitudeControl = _this.addItemForm.controls['latitude'];
                latitudeControl.setValue(result.coords.latitude);
                // todo: this needs to be done on server
                _this.http.post('https://rly.lepus.uberspace.de/budget/api/test/location', {
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude
                })
                    .subscribe(function (res) {
                    res = JSON.parse(res._body);
                    console.log(res);
                    if (res.results) {
                        var shopAdressControl = _this.addItemForm.controls['shopAdress'];
                        shopAdressControl.setValue(res.results[0].name);
                        var shopNameControl = _this.addItemForm.controls['shopName'];
                        shopNameControl.setValue(res.results[0].vicinity);
                    }
                    else {
                        console.log('error retrieving current location\'s name');
                    }
                });
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
        }
    };
    AddPage.prototype.showCategoryModal = function () {
        var _this = this;
        var categoryModal = this.modalCtrl.create(categories_modal_1.CategoriesModal, {}, {});
        categoryModal.onDidDismiss(function (category) {
            var categoryControl = _this.addItemForm.controls['category'];
            categoryControl.setValue(category);
        });
        categoryModal.present();
    };
    AddPage.prototype.onFocus = function (input) {
        console.log('onfocus');
        this.focusModel[input] = true;
    };
    AddPage.prototype.onBlur = function (input) {
        this.focusModel[input] = false;
    };
    AddPage.prototype.onSubmit = function () {
        var _this = this;
        //todo: form validation?
        console.log("submit");
        this.storage.pushItem('items', this.addItemForm.value).then(function (value) {
            if (_this.platform.is('cordova')) {
                ionic_native_2.Toast.show("Einkauf gespeichert", '5000', 'bottom').subscribe(function (toast) {
                    console.log(toast);
                });
            }
            _this.navCtrl.push(home_1.HomePage); // todo: go to rootpage, don't push homepage
        });
    };
    __decorate([
        core_1.Input()
    ], AddPage.prototype, "addItemForm");
    AddPage = __decorate([
        core_1.Component({
            selector: 'page-add',
            templateUrl: 'add.html'
        })
    ], AddPage);
    return AddPage;
}());
exports.AddPage = AddPage;
