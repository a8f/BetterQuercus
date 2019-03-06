// ==UserScript==
// @name	 BetterQuercus
// @description Improvements for Quercus
// @namespace http://airstrafe.net
// @version	 0.1
// @run-at document-end
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include https://q.utoronto.ca/*
// ==/UserScript==

/**** CONSTANTS ****/
const trace = true; // Output debug info
const minHeaderWidth = 20; // Width of header when minimized
const biggerFilePadding = '24'; // How much padding for bigger file preview (default 24)
const hideNavBar = true; // Hide the left navigation bar unless moused over
const neverExpandNavBar = true; // Automatically collapse the left navigation bar to not have item titles
const biggerFilePreview = true; // Expand file preview window


/**** ENTRYPOINT ****/
log("Loaded BetterQuercus");
this.$ = this.jQuery = jQuery.noConflict(true);
init();
log("Successfully completed initialization");


/**** FUNCTIONS ****/
function log(info) {
    if (trace) console.log('BQ: ' + info); 
}

function init() {
    if (neverExpandNavBar && $('body').hasClass('primary-nav-expanded')) {
        $('#primaryNavToggle').click();
        log('Minimized navigation bar');
    }
    if (hideNavBar) {
        initMinimizeHeader();
    }
    if (window.location.href.indexOf('/files/') != -1 && biggerFilePreview) {
        makeFilePreviewBigger();
    }
}

function initMinimizeHeader() {
    $('#header').hover(headerEnter, headerExit);
    headerExit();
    log('Hid navigation bar');
}

function headerExit() {
    $('#wrapper').removeClass('ic-Layout-wrapper');
    $('#header').width(minHeaderWidth).children().hide();
}

function headerEnter(header) {
    $('#wrapper').addClass('ic-Layout-wrapper');
    $('#header').width('').children().show();
}

function makeFilePreviewBigger() {
    // Hide course navigation menu
    if ($('body').hasClass('course-menu-expanded')) {
        $('#courseMenuToggle').click();
    }
    // Remove redundant filename and make filename smaller
    var content = $('#content');
    content.css('padding', biggerFilePadding);
    content.children().first().remove();
    var dlLink = content.children().first().children().first().attr('style', 'font-size: 2em').children();
    // Remove word "download" if language is English
    if ($('html').attr('lang').indexOf('en-') == 0) {
        var dlText = dlLink.text();
        dlLink.text(dlText.substring(9, dlText.length));
    }
    log('Made file preview bigger');
}
