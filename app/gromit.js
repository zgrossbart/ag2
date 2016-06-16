/*******************************************************************************
 *
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
'use strict';
/*
 * This is a utility object which we can use to hold window level
 * variables and utility functions
 */
/*global gromit:true */
var gromit;
(function (gromit_1) {
    var gromit = (function () {
        function gromit() {
            this.uidCounter = 0;
        }
        /**
         * This is a helper function to add a CSS link to the HEAD of the current
         * document.
         */
        gromit.prototype.addCSSLink = function (file) {
            jQuery('head').append('<link>');
            var css = $('head').children(':last');
            css.attr({
                rel: 'stylesheet',
                type: 'text/css',
                href: file
            });
            return css;
        };
        gromit.prototype.isCanvasSupported = function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        };
        gromit.prototype.updateStyles = function () {
            this.addWideStyle();
        };
        gromit.prototype.addWideStyle = function () {
            if ($(window).width() >= 1400 &&
                !g.wideCSS) {
                g.wideCSS = g.addCSSLink('gromit/css/uncompressed_css/client.wide.css');
                return;
            }
            if (g.wideCSS &&
                $(window).width() <= 1400) {
                g.wideCSS.remove();
                delete g.wideCSS;
            }
        };
        gromit.prototype.init = function () {
            if (this.bestLocale) {
                if (this.bestLocale.indexOf('_#') !== -1) {
                    /*
                    * This means that the browser determined one of the new compound
                    * locales.  However, the moment library doesn't support those yet.
                    * That means we need to strip off the last part.
                    */
                    this.bestLocale = this.bestLocale.substring(0, this.bestLocale.indexOf('_#'));
                }
                moment.locale(this.bestLocale);
                /*
                * We want to specify the formats for the short dates in English
                * so they don't have the starting zero.
                */
                if (this.bestLocale.indexOf('en') === 0) {
                    moment.locale('en', {
                        longDateFormat: {
                            L: 'M/D/YYYY',
                            LT: 'h:mm A',
                            LL: 'MMMM Do YYYY',
                            LLLL: 'ddd MMMM D YYYY LT'
                        }
                    });
                }
            }
            var localeData = moment.localeData();
            this.token = $.cookie('gromitTokenCookie');
            this.tokenType = $.cookie('gromitTokenTypeCookie');
            if (this.debugMode) {
                this.addCSSLink('gromit/css/humanMsg.css');
                this.addCSSLink('gromit/css/reset.css');
                this.addCSSLink('gromit/css/coreui.css');
            }
            else {
                this.addCSSLink('gromit/css/gromit-all-min.css');
            }
            this.isiPad = navigator.userAgent.match(/iPad/i) !== null;
            if (this.isiPad) {
                this.addCSSLink('gromit/css/uncompressed_css/ipad.css');
            }
            /*
             * If the current browser supports canvas then we'll import paper.
             */
            this.hasCanvas = this.isCanvasSupported();
            /*
             * If the current browser is an iPad then we'll load the script to
             * enable touch events for JQuery sortable.
             */
            if (this.isiPad) {
                require(['js/lib/jquery.ui.touch-punch.js'], function () { });
            }
            this.updateStyles();
            $(window).resize(function () {
                this.updateStyles();
            });
        };
        return gromit;
    }());
    var g = new gromit();
    gromit_1.noFeedback = 'none';
    gromit_1.errorFeedback = 'error';
    gromit_1.validFeedback = 'valid';
    gromit_1.warningFeedback = 'warning';
    function init() {
        g.init();
    }
    gromit_1.init = init;
    function addCSSLink(file) {
        return g.addCSSLink(file);
    }
    gromit_1.addCSSLink = addCSSLink;
    /**
     * Create an ID which is unique in the page.
     */
    function createUniqueId() {
        g.uidCounter++;
        return 'gromitid-' + g.uidCounter;
    }
    gromit_1.createUniqueId = createUniqueId;
    /**
     * Parse the specified string into a JSON object in a safe way that won't run
     * unsafe scripts.
     */
    function parseJSON(json) {
        return JSON.parse(json);
    }
    gromit_1.parseJSON = parseJSON;
    /**
     * This is a very specialized helper function that can build an anchor with
     * sanitized text using jQuery to make sure the text doesn't run any HTML tags.
     *
     */
    function buildAnchorWithTextAndClass(cls, text) {
        var a = $('<a href="#"></a>');
        a.addClass(cls);
        a.text(text);
        var span = $('<span></span>');
        span.append(a);
        return span.html();
    }
    gromit_1.buildAnchorWithTextAndClass = buildAnchorWithTextAndClass;
    /**
     * This is a helper function for unifying a date and time into a
     * single date.  It takes the hours and minutes from the time and
     * sets them into the date and convert the whole thing back to a
     * number.
     */
    function unifyDateAndTime(date, time) {
        var d = new Date(date);
        var t = new Date(time);
        d.setHours(t.getHours());
        d.setMinutes(t.getMinutes());
        return d.getTime();
    }
    gromit_1.unifyDateAndTime = unifyDateAndTime;
    /**
     * Get the specified color property of the element with the specified ID
     * from CSS
     */
    function getCSSColor(id) {
        /*
        * We want to set the color of the circles from CSS, but elements in
        * paper don't have classes or selectors since they aren't DOM elements.
        * The solution is to create a new div tag with a well-known ID and
        * use JavaScript to look at the CSS property color of that tag.
        */
        var div = $('<div id="' + id + '"></div>');
        $('body').append(div);
        var color = div.css('color');
        div.remove();
        return color;
    }
    gromit_1.getCSSColor = getCSSColor;
    /**
     * Get the specified property of the element with the specified ID
     * from CSS
     */
    function getCSSProperty(id, propname) {
        /*
         * We want to set the color of the circles from CSS, but elements in
         * paper don't have classes or selectors since they aren't DOM elements.
         * The solution is to create a new div tag with a well-known ID and
         * use JavaScript to look at the CSS property color of that tag.
         */
        var div = $('<div id="' + id + '"></div>');
        $('body').append(div);
        var color = div.css(propname);
        div.remove();
        return color;
    }
    gromit_1.getCSSProperty = getCSSProperty;
    /**
     * Get the specified property of the element with the specified class
     * from CSS
     */
    function getCSSPropertyByClass(cls, propname) {
        /*
         * We want to set the color of the circles from CSS, but elements in
         * paper don't have classes or selectors since they aren't DOM elements.
         * The solution is to create a new div tag with a well-known ID and
         * use JavaScript to look at the CSS property color of that tag.
         */
        var div = $('<div class="' + cls + '"></div>');
        $('body').append(div);
        var color = div.css(propname);
        div.remove();
        return color;
    }
    gromit_1.getCSSPropertyByClass = getCSSPropertyByClass;
    /**
     * Print the specified message to the browser debug console if it is available.
     */
    function println(msg) {
        if (window.console) {
            console.info(msg);
        }
    }
    gromit_1.println = println;
    /**
     * Print the specified message to the browser debug console if it is available.
     */
    function info(msg) {
        if (window.console) {
            console.info(msg);
        }
    }
    gromit_1.info = info;
    /**
     * Print the javascript object to the browser debug console if it is available.
     */
    function printObj(object) {
        if (window.console) {
            console.info(JSON.stringify(object));
        }
    }
    gromit_1.printObj = printObj;
    /**
     * A small improvement on the Underscore isEmpty function which returns true if
     * the argument is undefined.
     */
    function isEmpty(arg) {
        return _.isEmpty(arg) && !_.isNumber(arg) && !_.isBoolean(arg);
    }
    gromit_1.isEmpty = isEmpty;
    ;
    /**
     * A little helper utility to validate location arguments
     */
    function isInvalidL10NArgument(arg) {
        if (arg === '') {
            return false;
        }
        else {
            return isEmpty(arg);
        }
    }
    gromit_1.isInvalidL10NArgument = isInvalidL10NArgument;
    ;
    /**
     * Scroll to the top left corner of the page.
     */
    function scrollToTop() {
        window.scrollTo(0, 0);
    }
    gromit_1.scrollToTop = scrollToTop;
    function scrollToElement(elementId) {
        $('html, body').animate({
            scrollTop: $('#' + elementId).offset().top
        }, 1000);
    }
    gromit_1.scrollToElement = scrollToElement;
    /**
     * Log an error to the debug console if the console is available
     */
    function logerror(code, subcode, text) {
        if (window.console) {
            console.error(code + ':' + subcode + ':' + text);
        }
    }
    gromit_1.logerror = logerror;
    /**
     * Log a warning to the debug console if the console is available
     */
    function logWarning(text) {
        if (window.console) {
            console.warn(text);
        }
    }
    gromit_1.logWarning = logWarning;
    /**
     * Get a string representing the full format of the date and time represented by the specified number.
     */
    function fullDateTimeFormat(epoch) {
        if (_.isNumber(epoch)) {
            return moment(epoch).format('LLLL');
        }
    }
    gromit_1.fullDateTimeFormat = fullDateTimeFormat;
    /**
     * Get a string representing the full format of the date represented by the specified number.
     */
    function fullDateFormat(epoch) {
        if (_.isNumber(epoch)) {
            return moment(epoch).format('LL');
        }
    }
    gromit_1.fullDateFormat = fullDateFormat;
    /**
     * Get a string representing the amount of time between the specififed date and now
     */
    function fromNowFormat(epoch) {
        if (_.isNumber(epoch)) {
            return moment(epoch).fromNow();
        }
    }
    gromit_1.fromNowFormat = fromNowFormat;
    /**
     * Get a string representing the duration between the two specified dates
     */
    function dateDiff(a, b) {
        return moment.duration(moment(b).diff(moment(a))).humanize();
    }
    gromit_1.dateDiff = dateDiff;
    /**
     * Get a string representing the short format of the date represented by the specified number.
     */
    function shortDateFormat(epoch, stripTime) {
        if (_.isNumber(epoch)) {
            if (stripTime) {
                return moment(epoch).format('L');
            }
            return moment(epoch).format('L LT');
        }
    }
    gromit_1.shortDateFormat = shortDateFormat;
    ;
    /**
     * Set the locale to use for date and time formatting.
     */
    function setLocale(locale) {
        moment.locale(locale);
        g.bestLocale = locale;
    }
    gromit_1.setLocale = setLocale;
    /**
     * Strip time off of a date
     */
    function stripTime(date) {
        if (_.isNumber(date)) {
            return moment(date).startOf('day').toDate();
        }
    }
    gromit_1.stripTime = stripTime;
    /**
     * Strip time off of a date
     */
    function startOfDay(date) {
        return moment(date).startOf('day').toDate();
    }
    gromit_1.startOfDay = startOfDay;
    /**
     * start of tomorrow
     */
    function beginNextDay(date) {
        return moment(date).startOf('day').add(1, 'day').toDate();
    }
    gromit_1.beginNextDay = beginNextDay;
    /**
     * Escape the specified HTML so it is safe to render into the page without causing an XSS issues
     */
    function escapeHtml(html) {
        var div = $('<div></div>');
        div.text(html);
        return div.html();
    }
    gromit_1.escapeHtml = escapeHtml;
    /**
     * Show a humanized info message
     *
     * @param msg the message to show
     */
    function showMessage(msg) {
        require(['gromit/js/lib/humanmsg.js'], function () {
            humanMsg.setup();
            jQuery('#humanMsg').removeClass('humanMsgErr').removeClass('humanMsgWarn').addClass('humanMsgInfo');
            humanMsg.displayMsg(escapeHtml(msg), false);
        });
    }
    gromit_1.showMessage = showMessage;
    ;
    /**
     * Show a humanized warning message
     *
     * @param msg the message to show
     * @param shouldLog true if we should log this message and false otherwise
     */
    function showWarningMessage(msg, shouldLog) {
        require(['gromit/js/lib/humanmsg.js'], function () {
            humanMsg.setup();
            jQuery('#humanMsg').removeClass('humanMsgErr').removeClass('humanMsgInfo').addClass('humanMsgWarn');
            humanMsg.displayMsg(escapeHtml(msg), false);
            if (shouldLog) {
                logerror(0, 0, msg);
            }
        });
    }
    gromit_1.showWarningMessage = showWarningMessage;
    ;
    /**
     * Show a humanized error message
     *
     * @param msg the message to show
     */
    function showErrorMessage(msg) {
        require(['gromit/js/lib/humanmsg.js'], function () {
            humanMsg.setup();
            jQuery('#humanMsg').removeClass('humanMsgWarn').removeClass('humanMsgInfo').addClass('humanMsgErr');
            humanMsg.displayMsg(escapeHtml(msg), false);
            logerror(0, 0, msg);
        });
    }
    gromit_1.showErrorMessage = showErrorMessage;
    ;
    function showGeneralError(code, subcode, reason) {
        println('showGeneralError(' + code + ', ' + subcode + ', ' + reason + ')');
        if (!reason) {
            reason = ' ';
        }
        // show the fatal error, not showing the code or the subcode
        showFatalError(reason);
    }
    gromit_1.showGeneralError = showGeneralError;
    ;
    /**
     * Show a fatal error message in the page.
     */
    function showFatalError(msg) {
        var errorPanel = $('#errorpanel');
        if (errorPanel.length === 0) {
            errorPanel = $('<div id="errorpanel"><span></span></div>');
            var a = $('<a href="#" id="errorpanel_hide">X</a>');
            errorPanel.append(a);
            a.click(function (e) {
                e.preventDefault();
                errorPanel.hide();
            });
            $('#mainContent').prepend(errorPanel);
        }
        errorPanel.children('span').text(msg);
        errorPanel.show(msg);
        window.scrollTo(0, 0);
    }
    gromit_1.showFatalError = showFatalError;
    ;
    /**
     * Determines if the canvas tag is supported in the current browser.
     */
    function isCanvasSupported() {
        return g.isCanvasSupported();
    }
    gromit_1.isCanvasSupported = isCanvasSupported;
    /**
     * Parse the dateString into a moment using the short date format
     * @param dateString
     * @returns moment
     */
    function parseShortDateToMoment(dateString) {
        return moment(dateString, moment.localeData()._longDateFormat.L);
    }
    gromit_1.parseShortDateToMoment = parseShortDateToMoment;
    /**
     * Validate the date
     * @param dateString
     * @returns true/false
     */
    function isValidByMoment(dateString) {
        return moment(dateString, moment.localeData()._longDateFormat.L).isValid();
    }
    gromit_1.isValidByMoment = isValidByMoment;
    /**
     * Gets the short date format in the current locale.
     */
    function getShortDateFormat() {
        /*
        * The date formats are a little different between Moment and Angular so we need
        * to tweak them a little bit.
        */
        return moment.localeData()._longDateFormat.L.replace(/D/g, 'd').replace(/Y/g, 'y');
    }
    gromit_1.getShortDateFormat = getShortDateFormat;
    /**
     * Get data about the current locale
     */
    function getLocaleData() {
        return moment.localeData();
    }
    gromit_1.getLocaleData = getLocaleData;
    /**
     * Gets the first day of the week in the current locale.  The value is a number like
     * 0 for Sunday and 1 for Monday
     *
     */
    function getFirstDayOfWeek() {
        return moment.localeData()._week.dow;
    }
    gromit_1.getFirstDayOfWeek = getFirstDayOfWeek;
    /** convert "color" css property from jQuery to RGB array
     * jQuery returns "rgb(100,100, 100)"  or "#aabbcc" depended on the browser
     */
    function jQueryCssToRGB(str) {
        var rgb = str.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (rgb) {
            return [parseInt(rgb[1], 10), parseInt(rgb[2], 10), parseInt(rgb[3], 10)];
        }
        else {
            return hexToRGB(str);
        }
    }
    gromit_1.jQueryCssToRGB = jQueryCssToRGB;
    ;
    /**
     * convert hex color to rgb
     */
    function hexToRGB(h) {
        var str = (h.charAt(0) === '#') ? h.substring(1, 7) : h;
        return [parseInt(str.substring(0, 2), 16), parseInt(str.substring(2, 4), 16), parseInt(str.substring(4, 6), 16)];
    }
    gromit_1.hexToRGB = hexToRGB;
    /**
     * convert rgb color to hex
     */
    function rgbToHex(r, g, b) {
        /* can't use the below code due to compile error during gwt compiling*/
        //    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        //    console.log('rgb value r=' + r + ' g=' + g + ' b=' + b + "Hex value= " + "#" + gromit.componentToHex(r) + gromit.componentToHex(g) + gromit.componentToHex(b));
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    gromit_1.rgbToHex = rgbToHex;
    ;
    /**
     * Change int to hex value
     */
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    gromit_1.componentToHex = componentToHex;
    ;
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    gromit_1.isNumber = isNumber;
    /**************************************************
     *
     * This is the start of the exported security functions
     *
     **************************************************/
    /**
     * Get the current security token
     */
    function getToken() {
        return g.token;
    }
    gromit_1.getToken = getToken;
    /**
     * Set the current security token
     */
    function setToken(token) {
        g.token = token;
    }
    gromit_1.setToken = setToken;
    /**
     * Clear out the token
     */
    function clearToken() {
        delete g.token;
    }
    gromit_1.clearToken = clearToken;
    /**
     * Get the current security token type
     */
    function getTokenType() {
        return g.tokenType;
    }
    gromit_1.getTokenType = getTokenType;
    /**
     * Set the current security token type
     */
    function setTokenType(tokenType) {
        g.tokenType = tokenType;
    }
    gromit_1.setTokenType = setTokenType;
    /**
     * Clear out the token type
     */
    function clearTokenType() {
        delete g.tokenType;
    }
    gromit_1.clearTokenType = clearTokenType;
})(gromit = exports.gromit || (exports.gromit = {}));
;
//angular.module('gromitsoft', []); 
//# sourceMappingURL=gromit.js.map