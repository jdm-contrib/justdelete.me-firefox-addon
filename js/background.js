const data_url = "https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json";
(async () => {
    console.log(`Started background server.`);
    const json = await (await fetch(data_url)).json();
    
    /**
     * Set the icon.
     *
     * @param icon {"easy" | "medium" | "hard" | "impossible" | "limited" | "unknown"}
     * @param windowId {number} the current ID of the window.
     */
    function setIcon(icon, windowId) {
        //keep the default icon if the site isn't listed.
        if(icon === "unknown") {
            browser.browserAction.setIcon({
                path: {
                    128: "res/ext_icon_144.png",
                },
            });
            return;
        }
        
        browser.browserAction.setIcon({
            path: {
                128: `res/icons/${icon}.png`,
            },
        });
    }
    
    /**
     * Get the hostname from a URL.
     * 
     * @param url {string} the URL.
     * @returns {string} the hostname.
     */
    function getHostname(url) {
        return new URL(url).hostname;
    }
    
    /**
     * Search for the site and return the difficulty
     * 
     * @param domain {string}
     * @returns {"easy" | "medium" | "hard" | "impossible" | "limited" | undefined} the difficulty, or undefined if there is none.
     */
    function searchForSite(domain) {
        for (const site of json) {
            if (!site.domains) {
                continue;
            }
            
            for (const dm of site.domains) {
                if (domain === dm || domain.endsWith('.' + dm)) {
                    return site.difficulty;
                }
            }
        }

        return undefined;
    }
    
    function onTabChange(tabId) {
        browser.tabs.get(tabId).then((tab) => {
            if (!tab.url) {
                return setIcon("unknown", tab.windowId);
            }
            let hostname = getHostname(tab.url);
            const difficulty = searchForSite(hostname);
            setIcon(difficulty || "unknown", tab.windowId);
        }).catch((error) => {
            console.error(`${error}`);
        });
    }
    
    browser.tabs.onActivated.addListener((activeInfo) => {
        onTabChange(activeInfo.tabId);
    });
    
    browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
        if (changeInfo.status === 'complete' && changeInfo.url) {
            onTabChange(tabId);
        }
    });

    browser.tabs.onCreated.addListener((tab) => {
        if (tab.url) {
            onTabChange(tab.id);
        }
    });

    browser.webNavigation.onCompleted.addListener((details) => {
        if (details.frameId === 0) {
            onTabChange(details.tabId);
        }
    });
})();
