"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var _ = require('lodash');
// import {Product} from "../../../common/Product";
var categories_1 = require("../categories");
var CategoriesDetail = (function () {
    function CategoriesDetail(navCtrl, navParams, storage, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
    }
    CategoriesDetail.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.navParams.get('category')) {
            this.navCtrl.push(categories_1.CategoriesPage);
        }
        else {
            this.category = this.navParams.get('category');
            console.log(this.navParams.get('category'));
            this.storage.getItem('items').then(function (items) {
                _this.items = _.groupBy(items, 'category')[_this.category];
            });
        }
    };
    CategoriesDetail = __decorate([
        core_1.Component({
            selector: 'categories-detail',
            templateUrl: 'categories-detail.html'
        })
    ], CategoriesDetail);
    return CategoriesDetail;
}());
exports.CategoriesDetail = CategoriesDetail;
