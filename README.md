# JustDeleteMe Extension
<div style="text-align: center">
    <a href="https://addons.mozilla.org/en-US/firefox/addon/justdeleteme/">
        <img src="https://raw.githubusercontent.com/alexanderepolite/justdelete.me-firefox-addon/master/firefox_addon_image.png" alt="Download for Firefox">
    </a>
    <br>
    <img src="https://raw.githubusercontent.com/jdm-contrib/justdelete.me-firefox-addon/refs/heads/master/github_image.png">
</div>

This extension provides details on how to delete your accounts for websites, along with how difficult it is.

The extension icon will change depending on the difficulty, ranging from easy to impossible.

## Deletion Difficulties

| Icon                                                                 | Difficulty | Description                                                                                      |
|----------------------------------------------------------------------|------------|--------------------------------------------------------------------------------------------------|
| ![Easy](https://raw.githubusercontent.com/jdm-contrib/justdelete.me-firefox-addon/refs/heads/master/res/icons/easy.png)         | Green (Easy)   | Easy to delete your account (usually just by clicking a link and entering your password).         |
| ![Medium](https://raw.githubusercontent.com/jdm-contrib/justdelete.me-firefox-addon/refs/heads/master/res/icons/medium.png)     | Yellow (Medium)| Moderately difficult (usually requires users to confirm their email before deleting their account).|
| ![Hard](https://raw.githubusercontent.com/jdm-contrib/justdelete.me-firefox-addon/refs/heads/master/res/icons/hard.png)         | Red (Hard)     | Hard to delete accounts (requires that you send an email to the service or fill out a request form).|
| ![Impossible](https://raw.githubusercontent.com/jdm-contrib/justdelete.me-firefox-addon/refs/heads/master/res/icons/impossible.png) | Black (Impossible)| Websites which have this do not allow you to delete your account.                               |
| ![Limited](https://raw.githubusercontent.com/jdm-contrib/justdelete.me-firefox-addon/refs/heads/master/res/icons/limited.png)   | Purple (Limited)| Data deletion rights vary by country.                                                            |


## For Chrome and Chromium

Since this extension uses manifest v2, it is currently not compatible with Chromium-based browsers, but
there is [already an unofficial extension for that](https://github.com/fregante/jdm).

## Building from Source

1. Install [Bun](https://bun.sh/) (the Node.JS replacement) for the build tools.
2. Clone this repository: `git clone https://github.com/jdm-contrib/justdelete.me-firefox-addon`
3. Enter the directory in your terminal and run `bun x web-ext build`


Install the .zip file that is generated in `web-ext-artifacts` (you may need to disable code signing on Firefox to install, or use about:debugging).
