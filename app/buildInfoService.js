"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var BuildInfoService = (function () {
    function BuildInfoService(http) {
        this.http = http;
        this.buildInfoUrl = './build-info.json'; // URL to web API
    }
    BuildInfoService.prototype.getBuildInfo = function () {
        console.log('getting build info from: ' + this.buildInfoUrl);
        var r = this.http.get(this.buildInfoUrl)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        console.log('done getting build info');
        return r;
    };
    BuildInfoService.prototype.extractData = function (res) {
        console.log('res.json(): ' + res.json());
        var body = res.json();
        return body.data || {};
    };
    BuildInfoService.prototype.handleError = function (error) {
        console.log('handleError...');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    BuildInfoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BuildInfoService);
    return BuildInfoService;
}());
exports.BuildInfoService = BuildInfoService;
//# sourceMappingURL=buildInfoService.js.map