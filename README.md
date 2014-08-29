# JustDelete.me Firefox Addon

Provides link on a site to where to delete account and informs you how hard it is to delete your account.

Information about how to delete account is pulled daily from JustDelete.me ( http://justdelete.me/ ). 

This extension will add a traffic light icon to your urlbar indicating the difficulty in removing an account on the website you're visiting is.

Upon clicking this icon you will be taken to the page which you can delete your account.

## Colour Key:
* Green - Simple process
* Yellow - Some extra steps involved
* Red - Cannot be fully deleted without contacting customer-services
* Block - Cannot be deleted


## How to build

This add-on uses [Mozilla's Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK). Download that and [install it](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation) accordingly.

When you have installed the Add-on SDK you need to add the dependencies for this add-on. We need the [Urlbar Button module](https://github.com/voxpelli/moz-urlbarbutton) and the [ShowForPage module](https://github.com/voxpelli/moz-showforpage) so download those and add it to a packages/-folder within this addon - this is the way you add [third party modules](https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/tutorials/adding-menus.html) that an add-on uses.

Once you have added the dependency you can [download this add-on](https://github.com/alaouy/justdelete.me-firefox-addon) itself and run it and build it the way you like. Check the Add-on SDK [Getting Started tutorial](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials) to find out how that is done.


## Contributing

If you'd like to help this extension by adding a few lines of code, fork https://github.com/alaouy/justdelete.me-firefox-addon and send a pull request.

