const data_url = "https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json";

let json = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; //24h

async function fetchSitesData() {
   try {
       const response = await fetch(data_url);
       const data = await response.json();
       
       json = data;
       lastFetchTime = Date.now();
       
       return data;
   } catch(error) {
       console.error('Failed to fetch sites data:', error);
       return json;
   }
}

async function getSitesData() {
   const now = Date.now();
   const needsRefresh = !json || ((now - lastFetchTime) > CACHE_DURATION);
   
   if(needsRefresh) {
       await fetchSitesData();
   }
   
   return json;
}

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
* @returns {Promise<"easy" | "medium" | "hard" | "impossible" | "limited" | undefined>} the difficulty, or undefined if there is none.
*/
async function searchForSite(domain) {
   const sitesData = await getSitesData();
   
   if (!sitesData) {
       return undefined;
   }
   
   for(const site of sitesData) {
       if(!site.domains) {
           continue;
       }
      
       for(const dm of site.domains) {
           if((domain === dm) || domain.endsWith('.' + dm)) {
               return site.difficulty;
           }
       }
   }
   return undefined;
}

async function onTabChange(tabId) {
   try {
       const tab = await browser.tabs.get(tabId);
       
       if(!tab.url) {
           return setIcon("unknown", tab.windowId);
       }
       
       const hostname = getHostname(tab.url);
       const difficulty = await searchForSite(hostname);
       
       setIcon(difficulty || "unknown", tab.windowId);
   } catch(e) {
       console.error(e);
   }
}

(async () => {
   console.log(`Started background server.`);
   await fetchSitesData();
   
   setInterval(async () => {
       await fetchSitesData();
   }, CACHE_DURATION);
   
   browser.tabs.onActivated.addListener((activeInfo) => {
       onTabChange(activeInfo.tabId);
   });
  
   browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
       if((changeInfo.status === 'complete') && changeInfo.url) {
           onTabChange(tabId);
       }
   });
   
   browser.tabs.onCreated.addListener((tab) => {
       if(tab.url) {
           onTabChange(tab.id);
       }
   });
   
   browser.webNavigation.onCompleted.addListener((details) => {
       if(details.frameId === 0) {
           onTabChange(details.tabId);
       }
   });
})();