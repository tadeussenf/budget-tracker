"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var _ = require('lodash');
var StatisticPage = (function () {
    function StatisticPage(navCtrl, navParams, storage, rd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.rd = rd;
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.pieChartType = 'pie'; // type of chart to use, not it's name :)
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartLabels = [];
        this.barChartData = [{ data: [], label: '' }];
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
                xAxes: [{
                        stacked: true
                    }],
                yAxes: [{
                        stacked: true
                    }]
            }
        };
    }
    StatisticPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getItem('items').then(function (items) {
            _this.items = items;
            _this.storage.getItem('categories').then(function (categories) {
                _this.categories = categories;
                _this.buildPieChart();
                _this.buildBarChart();
            });
        });
    };
    StatisticPage.prototype.ngAfterViewInit = function () {
    };
    StatisticPage.prototype.onShare = function () {
        // setTimeout(() => {
        console.log(this.input.nativeElement.toDataURL());
        // });
        ionic_native_1.SocialSharing.share('message', 'subject', this.input.nativeElement.toDataURL());
    };
    StatisticPage.prototype.buildPieChart = function () {
        var _this = this;
        this.pieChartLabels = this.categories;
        this.items.forEach(function (item) {
            _this.pieChartData.push(item.price);
        });
    };
    StatisticPage.prototype.buildBarChart = function () {
        var _this = this;
        this.barChartLabels = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        this.barChartData = [];
        var obj = _.groupBy(this.items, function (item) {
            return item.category;
        });
        _.forEach(obj, function (item, categoryKey) {
            var months = _.groupBy(item, function (item) {
                return new Date(item.date).getMonth(); // todo: getMonth is not a function on android and somehow deletes SWL DB
            });
            var sums = [];
            console.log(months);
            _.forEach(months, function (item, monthKey) {
                sums[monthKey] = _.sumBy(item, 'price');
            });
            console.log(sums);
            _this.barChartData.push({
                data: sums,
                label: categoryKey
            });
        });
        console.log(this.barChartData);
    };
    // events
    StatisticPage.prototype.chartClicked = function (e) {
        // console.log(e);
    };
    StatisticPage.prototype.chartHovered = function (e) {
        // console.log(e);
    };
    __decorate([
        core_1.ViewChild('barChartCanvas')
    ], StatisticPage.prototype, "input");
    StatisticPage = __decorate([
        core_1.Component({
            selector: 'page-statistic',
            templateUrl: 'statistic.html'
        })
    ], StatisticPage);
    return StatisticPage;
}());
exports.StatisticPage = StatisticPage;
