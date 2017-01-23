"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var add_1 = require("../add/add");
var HomePage = (function () {
    function HomePage(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getItem('items').then(function (items) {
            _this.items = items;
        });
    };
    HomePage.prototype.onRemove = function (date) {
        var _this = this;
        this.storage.removeItem('items', date).then(function () {
            _this.ngOnInit();
        });
    };
    HomePage.prototype.addItem = function (item) {
        this.navCtrl.push(add_1.AddPage, { item: item });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
