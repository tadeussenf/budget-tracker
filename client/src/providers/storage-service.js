"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
/*
 Generated class for the StorageService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var StorageService = (function () {
    function StorageService(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    StorageService.prototype.saveInitialData = function () {
        var _this = this;
        this.getItem('first_run').then(function (value) {
            if (value !== "true") {
                var items = [
                    {
                        productName: "Coffee-To-Go",
                        price: 3.99,
                        category: "ToGo",
                        date: new Date("2016-12-16T17:17:36.675Z"),
                        shopAdress: "Aldi Schmidener Straße ..."
                    },
                    {
                        productName: "Coffee-To-Go",
                        price: 2.99,
                        category: "ToGo",
                        date: new Date("2016-11-16T17:17:36.675Z"),
                        shopAdress: "Aldi Schmidener Straße ..."
                    },
                    {
                        productName: "Coffee-To-Go",
                        price: 1.99,
                        category: "ToGo",
                        date: new Date("2016-10-16T17:17:36.675Z"),
                        shopAdress: "Aldi Schmidener Straße ..."
                    },
                    {
                        productName: "Pullover",
                        price: 29.95,
                        category: "Kleidung",
                        date: new Date("2016-12-16T17:17:36.675Z"),
                        shopAdress: "Aldi Schmidener Straße ..."
                    },
                    {
                        productName: "Pullover",
                        price: 29.95,
                        category: "Kleidung",
                        date: new Date("2016-12-16T17:19:36.675Z"),
                        shopAdress: "Aldi Schmidener Straße ..."
                    }
                ];
                var categories_1 = ["ToGo", "Kleidung", "Lebensmittel", "Restaurant", "Bar", "Lieferservice"];
                _this.setItem('items', items).then(function () {
                    _this.setItem('categories', categories_1).then(function () {
                        _this.setItem('first_run', 'true').then(function (data) {
                            console.log(data);
                            console.log('App is running for the first time, generating example data');
                        });
                    });
                });
            }
        });
    };
    StorageService.prototype.setItem = function (key, obj) {
        return this.storage.set(key, obj);
    };
    StorageService.prototype.pushItem = function (key, obj) {
        var _this = this;
        return this.storage.get(key).then(function (value) {
            value.push(obj);
            return _this.storage.set(key, value);
        });
    };
    StorageService.prototype.getItem = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype.removeItem = function (key, id) {
        var _this = this;
        return this.storage.get(key).then(function (value) {
            var result = value.filter(function (e) {
                return JSON.stringify(e.date) !== JSON.stringify(id);
            });
            return _this.storage.set(key, result);
        });
    };
    StorageService = __decorate([
        core_1.Injectable()
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
