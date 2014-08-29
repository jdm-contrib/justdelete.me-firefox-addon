/*global require: false, exports: false */
/*jslint indent: 2, white: true */

(function() {
  "use strict";

  var urlbarButton = require('urlbarbutton').UrlbarButton,
    showForPage = require('showforpage').ShowForPage,
    request = require("sdk/request").Request,
    ss = require("sdk/simple-storage"),
    tabs = require('sdk/tabs'),
    pb = require("sdk/private-browsing"),
    data = require("sdk/self").data,
    URL = require("sdk/url").URL,
    updateSites,
    runUpdater,
    getHostname,
    getInfo,
    listeners,
    checkLocation,
    updateButton,
    button,
    buttonImage = data.url('icon_16.png'),
    sites = {},
    subdomains = ['www', 'support', 'mail', 'ssl', 'new', 'cgi1', 'en', 'myaccount', 'meta', 'help', 'support', 'edit']; // The odd subdomains people append to their site.

  updateSites = function () {
    request({
      url: "https://raw.github.com/rmlewisuk/justdelete.me/master/sites.json",
      onComplete: function(response) {

        sites = response.json;

        // Update our local cache
        ss.storage.sites = sites;
        ss.storage.lastUpdated = (new Date().getTime());
      },
      anonymous: true
    }).get();

  };

  runUpdater = function () {
    // Load the list of supported sites
    if (ss.storage.sites !== undefined) {
      sites = ss.storage.sites;

      // If we haven't updated in the last day.
      if (ss.storage.lastUpdated === undefined || ss.storage.lastUpdated < new Date().setDate(new Date().getDate() - 1)) {
        updateSites();
      }
    } else {
      // Reload it via AJAX
      updateSites();
    }
  };


  // Turns url string into just the hostname.
  getHostname = function (url, opts_strict) {
    var a = URL(url), i;

    if (opts_strict === true) {
      return a.hostname;
    }

    // Quickly strip any odd subdomains off
    for (i = 0; i < subdomains.length; i++) {
      url = url.replace('/' + subdomains[i] + '.', '/');
    }
    a = URL(url);

    return a.hostname;
  };
  
  // Cycle through the known sites and see if we have dirt on them.

  getInfo = function (url) {
    console.log('getInfo called');
    // Start with a strict search
    var hostname = getHostname(url, true);
    var i, d, site, domain;

    for (i = 0; i < sites.length; i++) {
      site = sites[i];
      if (site.domains !== undefined) {
        for (d = 0; d < site.domains.length; d++) {
          domain = site.domains[d];
          if (domain.indexOf(hostname) !== -1) {
            return site;
          }
        }
      }
    }

    // do a less strict search
    hostname = getHostname(url, false);
    for (i = 0; i < sites.length; i++) {
      site = sites[i];
      if (site.domains !== undefined) {

        for (d = 0; d < site.domains.length; d++) {
          domain = site.domains[d];
          if (domain.indexOf(hostname) !== -1) {
            return site;
          }
        }
      }
    }
    return false;
  };

  // Update our local sites index
  runUpdater();
  

  updateButton = function (href) {
    var info = getInfo(href);
    if (info !== false) {
      button.setImage(data.url('icon_' + info.difficulty + '_16.png'), href);
      button.setOptions({gotoUrl: info.url, tooltip: info.name});
      if (info.notes !== undefined) {
        button.setOptions({tooltip: info.name + ': ' + info.notes});
      }
      button.setVisibility(true, href);
    } else {
      button.setVisibility(false, href);
    }
  };
  
  checkLocation = function(href, domReady) {
    console.log('checkLocation is loaded -- url ' + href);
    if (! pb.isPrivate(tabs.activeTab) && href !== '' && href !== 'about:newtab') {
      updateButton(href);
    }
  };

  exports.main = function () {
    button = urlbarButton({
      id : 'JustDeleteMe',
      image : buttonImage,
      tooltip : "Just Delete Me!"
    });

    listeners = showForPage({
      onLocationChange : checkLocation
    });
  };

  exports.onUnload = function (reason) {
    if (reason !== 'shutdown') {
      button.remove();
      listeners.remove();
    }
  };

}());
