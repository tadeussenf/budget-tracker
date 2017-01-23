"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var categories_detail_1 = require("./detail/categories-detail");
var _ = require('lodash');
var CategoriesPage = (function () {
    function CategoriesPage(navCtrl, navParams, storage, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
    }
    CategoriesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.categories = [];
        this.storage.getItem('items').then(function (items) {
            _this.items = items;
            _this.storage.getItem('categories').then(function (categories) {
                _.forEach(categories, function (category) {
                    _this.categories.push({ name: category, number: _this.getNumberOfItems(category) });
                });
            });
        });
    };
    CategoriesPage.prototype.getNumberOfItems = function (category) {
        return _.filter(this.items, { 'category': category }).length;
    };
    CategoriesPage.prototype.onClick = function (category) {
        this.navCtrl.push(categories_detail_1.CategoriesDetail, { category: category });
    };
    CategoriesPage = __decorate([
        core_1.Component({
            selector: 'page-categories',
            templateUrl: 'categories.html'
        })
    ], CategoriesPage);
    return CategoriesPage;
}());
exports.CategoriesPage = CategoriesPage;
