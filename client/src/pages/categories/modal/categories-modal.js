"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CategoriesModal = (function () {
    function CategoriesModal(navCtrl, navParams, storage, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        console.log('init modal');
    }
    CategoriesModal.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getItem('categories').then(function (categories) {
            _this.categories = categories;
        });
    };
    CategoriesModal.prototype.dismiss = function (model) {
        console.log("dismissed");
        this.viewCtrl.dismiss(model);
    };
    CategoriesModal.prototype.addCategory = function (category) {
        var _this = this;
        this.storage.pushItem('categories', category).then(function () {
            _this.categories.push(category);
        });
        this.category = null;
    };
    CategoriesModal = __decorate([
        core_1.Component({
            selector: 'categories-modal',
            templateUrl: 'categories-modal.html'
        })
    ], CategoriesModal);
    return CategoriesModal;
}());
exports.CategoriesModal = CategoriesModal;
