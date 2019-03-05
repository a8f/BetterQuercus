// ==UserScript==
// @name	 BetterQuercus
// @description Improvements for Quercus
// @namespace http://airstrafe.net
// @version	 1
// @run-at document-end
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include https://q.utoronto.ca/*
// ==/UserScript==

/**** CONSTANTS ****/
const trace = true;
const minHeaderWidth = 20;

/**** ENTRYPOINT ****/
if (trace) console.log("Loaded BetterQuercus");

this.$ = this.jQuery = jQuery.noConflict(true);

var settings = loadSettings();
init();


/**** FUNCTIONS ****/
function log(info) {
    if (trace) console.log(info); 
}

function loadSettings() {
    // TODO load from GM
    var settings = {hideNavBar: true, neverExpandNavBar: true, biggerFilePreview: true};
    log("Loaded settings");
    return settings;
}

function init() {
	createSettingsButton();
    if (settings.neverExpandNavBar && $('body').hasClass('primary-nav-expanded')) {
	    $('#primaryNavToggle').click();
    }
	if (settings.hideNavBar) {
        initMinimizeHeader();
    }
    if (window.location.href.indexOf('/files/') != -1 && settings.biggerFilePreview) {
        makeFilePreviewBigger();
    }
}

function createSettingsButton() {
    var menu = $('#menu');
    var settingsButton = menu.children('.ic-app-header__menu-list-item').last().clone();
    settingsButton.children().remove();
    settingsButton.append('<a class="ic-app-header__menu-list-link"><i class="icon-hamburger" style="color: white"></i></a>');
    // TODO create settings dialog onClick
    menu.append(settingsButton);
}

function initMinimizeHeader() {
    $('#header').hover(headerEnter, headerExit);
    headerExit();
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
    content.css('padding', '20');
	content.children().first().remove();
    var dlLink = content.children().first().children().first().attr('style', 'font-size: 2em').children();
    // Remove word "download" if language is English
    if ($('html').attr('lang').indexOf('en-') == 0) {
	var dlText = dlLink.text();
        dlLink.text(dlText.substring(9, dlText.length));
    }
}