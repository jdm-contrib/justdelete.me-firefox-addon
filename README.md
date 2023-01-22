# JustDeleteMe Extension

This extension provides details on how to delete your accounts for websites, along with how difficult it is.

The extension icon will change depending on the difficulty, ranging from easy to impossible.

## Download
You can download the extension [![at this link](https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/addons/files/2015/11/get-the-addon.png)](https://addons.mozilla.org/en-US/firefox/addon/justdeleteme/).

## Difficulties

* Green (Easy) - Easy to delete your account (usually just by clicking a link and entering your password).
* Yellow (Medium) - Moderately difficult (usually requires users to confirm their email before deleting their account).
* Red (Hard) - Hard to delete accounts (requires that you send an email to the service or fill out a request form).
* Black (Impossible) - Websites which have this do not allow you to delete your account.
* Cyan (Limited) - Data deletion rights vary by country.

## For Chrome and Chromium

Since this extension uses manifest v2, it is currently not compatible with Chromium-based browsers, but
there is [already an extension for that](https://chrome.google.com/webstore/detail/just-delete-me/hfpofkfbabpbbmchmiekfnlcgaedbgcf) by Mike Rogers.

## Building

Install web-ext through NPM: `npm i -g web-ext`

Clone this repository: `git clone https://github.com/jdm-contrib/justdelete.me-firefox-addon`, then run `web-ext build`

Install the .zip file that is generated in `web-ext-artifacts`
