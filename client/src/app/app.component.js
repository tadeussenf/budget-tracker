"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var home_1 = require('../pages/home/home');
var statistic_1 = require('../pages/statistic/statistic');
var categories_1 = require("../pages/categories/categories");
var MyApp = (function () {
    function MyApp(platform, storage) {
        this.platform = platform;
        this.storage = storage;
        this.rootPage = home_1.HomePage;
        this.initializeApp();
        this.testInput();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Start', component: home_1.HomePage },
            { title: 'Kategorien', component: categories_1.CategoriesPage },
            { title: 'Karte', component: statistic_1.StatisticPage },
            { title: 'Statistik', component: statistic_1.StatisticPage }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault(); // todo only if mobile platform
            ionic_native_1.Splashscreen.hide(); // todo only if mobile platform
            _this.storage.saveInitialData();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    // for BA text
    MyApp.prototype.testInput = function () {
        var noop = "noop1";
        if (true) {
            var noop_1 = "noop2";
        }
        console.log(noop);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav");
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html'
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
