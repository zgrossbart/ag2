/*******************************************************************************
 *
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
"use strict";
var oauth_ts_1 = require('./oauth.ts');
var gromit_rest;
(function (gromit_rest) {
    var Request = (function () {
        function Request(method, url, headers) {
            this.method = method;
            this.url = url;
            this.headers = headers;
            this.isBackground = false;
        }
        return Request;
    }());
    /**
     * Get a specified JSON resource from the server.
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param successCallback the function that will be called back with the data
     * @param errorCallback the function that will be called back if the request fails
     * @param unknownErrorCallback the function that will be called back if the request fails
     */
    function get(url, http, successCallback, errorCallback, unknownErrorCallback) {
        var req = new Request('GET', url, {
            'Accept': 'application/json'
        });
        req.http = http;
        req.successCallback = successCallback;
        req.errorCallback = errorCallback;
        req.unknownErrorCallback = unknownErrorCallback;
        oauth_ts_1.gromit_oauth.doRequest(req);
    }
    gromit_rest.get = get;
    /**
     * Get a specified JSON resource from the server and indicate that this is a background request.
     * That means this call will not extend the life of any sessions or security tokens.
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param successCallback the function that will be called back with the data
     * @param errorCallback the function that will be called back if the request fails
     * @param unknownErrorCallback the function that will be called back if the request fails
     */
    function getInBackground(url, http, successCallback, errorCallback, unknownErrorCallback) {
        var req = new Request('GET', url, {
            'Accept': 'application/json'
        });
        req.method = 'GET';
        req.url = url;
        req.headers = {
            'Accept': 'application/json'
        };
        req.http = http;
        req.successCallback = successCallback;
        req.errorCallback = errorCallback;
        req.unknownErrorCallback = unknownErrorCallback;
        req.isBackground = true;
        oauth_ts_1.gromit_oauth.doRequest(req);
    }
    gromit_rest.getInBackground = getInBackground;
    /**
     * Get a specified JSON resource as a promise from the server.
     * Used only for typeahead
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param errorCallback (optional)
     */
    function getPromise(url, http, errorCallback) {
        var req = new Request('GET', url, {
            'Accept': 'application/json'
        });
        req.http = http;
        req.errorCallback = errorCallback;
        return oauth_ts_1.gromit_oauth.requestPromise(req);
    }
    gromit_rest.getPromise = getPromise;
    ;
    /**
     * POST to GET a specified JSON resource as a promise from the server.
     * Used only for typeahead that require post for searchCriteria
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     */
    function postPromise(url, http, data) {
        var req = new Request('POST', url, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        req.data = data;
        req.http = http;
        return oauth_ts_1.gromit_oauth.requestPromise(req);
    }
    gromit_rest.postPromise = postPromise;
    ;
    /**
     * POST JSON data to the server
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param data the data to send to the server
     * @param successCallback the function that will be called back with the data
     * @param errorCallback the function that will be called back if the request fails
     * @param unknownErrorCallback the function that will be called back if the request fails
     */
    function post(url, http, data, successCallback, errorCallback, unknownErrorCallback, headers) {
        if (!headers) {
            headers = {};
        }
        var req = new Request('POST', url, headers);
        req.data = data;
        postWithRequest(req, http, successCallback, errorCallback, unknownErrorCallback);
    }
    gromit_rest.post = post;
    function postWithRequest(req, http, successCallback, errorCallback, unknownErrorCallback) {
        if (!req.headers['Content-Type']) {
            req.headers['Content-Type'] = 'application/json';
        }
        if (!req.headers['Accept']) {
            req.headers['Accept'] = 'application/json';
        }
        req.http = http;
        req.successCallback = successCallback;
        req.errorCallback = errorCallback;
        req.unknownErrorCallback = unknownErrorCallback;
        oauth_ts_1.gromit_oauth.doRequest(req);
    }
    /**
     * POST JSON data to the server
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param data the data to send to the server
     * @param successCallback the function that will be called back with the data
     * @param errorCallback the function that will be called back if the request fails
     * @param unknownErrorCallback the function that will be called back if the request fails
     */
    function postInBackground(url, http, data, successCallback, errorCallback, unknownErrorCallback, headers) {
        if (!headers) {
            headers = {};
        }
        var req = new Request('POST', url, headers);
        req.data = data;
        req.isBackground = true;
        postWithRequest(req, http, successCallback, errorCallback, unknownErrorCallback);
    }
    gromit_rest.postInBackground = postInBackground;
    ;
    /**
     * PUT JSON data to the server
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param data the data to send to the server
     * @param successCallback the function that will be called back with the data
     * @param errorCallback the function that will be called back if the request fails
     * @param unknownErrorCallback the function that will be called back if the request fails
     */
    function put(url, http, data, successCallback, errorCallback, unknownErrorCallback) {
        var req = new Request('PUT', url, {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        req.data = data;
        req.http = http;
        req.successCallback = successCallback;
        req.errorCallback = errorCallback;
        req.unknownErrorCallback = unknownErrorCallback;
        oauth_ts_1.gromit_oauth.doRequest(req);
    }
    gromit_rest.put = put;
    /**
     * Delete a specified resource form the server
     *
     * @param url the URL of the resource
     * @param http the Angular HTTP object to make the request with
     * @param successCallback the function that will be called back with the data
     * @param errorCallback the function that will be called back if the request fails
     * @param unknownErrorCallback the function that will be called back if the request fails
     */
    function del(url, http, successCallback, errorCallback, unknownErrorCallback) {
        var req = new Request('DELETE', url, {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        req.data = {};
        req.http = http;
        req.successCallback = successCallback;
        req.errorCallback = errorCallback;
        req.unknownErrorCallback = unknownErrorCallback;
        oauth_ts_1.gromit_oauth.doRequest(req);
    }
    gromit_rest.del = del;
})(gromit_rest = exports.gromit_rest || (exports.gromit_rest = {}));
//# sourceMappingURL=rest.js.map