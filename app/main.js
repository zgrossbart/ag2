"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var buildInfoService_1 = require('./buildInfoService');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, buildInfoService_1.BuildInfoService]);
//# sourceMappingURL=main.js.map