const data_url = "https://raw.githubusercontent.com/jdm-contrib/jdm/master/_data/sites.json";

(async () => {
    const json = await (await fetch(data_url)).json();
    
    /**
     * Search for the site and return the difficulty or notes
     *
     * @param domain {string}
     * @param query {"difficulty" | "notes"} the query (instead of the "difficulty" parameter).
     * @returns {"easy" | "medium" | "hard" | "impossible" | "limited" | string | undefined} the difficulty or notes, or undefined if there is none.
     */
    function searchForSite(domain, query = "difficulty") {
        for (const site of json) {
            if (!site.domains) {
                continue;
            }

            for (const dm of site.domains) {
                if (domain === dm || domain.endsWith('.' + dm)) {
                    return query === "difficulty" ? site.difficulty : site.notes;
                }
            }
        }
    }
      
    function getHostname(url) {
        return new URL(url).hostname;
    }
    
    // Convert markdown links such as:
    // Delete your account [here](https://example.com/delete) to a valid HTML link.
    function convertMarkdown(markdown) {
        return markdown.replace(/$$([^$$]+)\]$(https?:\/\/[^\s)]+)$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    }    
    
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        try {
            let tab = tabs[0];
            if (!tab.url) {
                return;
            }
            
            const base = getHostname(tab.url);
            
            const difficulty = searchForSite(base, "difficulty");
            const notes = searchForSite(base, "notes");
            
            if (!difficulty) {
                document.getElementById("contribute").hidden = false;
                return;
            }
            
            let difficulty_string;
            
            switch (difficulty) {
                case "easy":
                    difficulty_string = `It is <b>easy</b> to delete your account for <b>${base}</b>!`;
                    break;
                case "medium":
                    difficulty_string = `It is <b>moderately difficult</b> to delete your account for <b>${base}</b>!`;
                    break;
                case "hard":
                    difficulty_string = `It is <b>hard</b> to delete your account for <b>${base}</b>!`;
                    break;
                case "impossible":
                    difficulty_string = `It is <b>impossible</b> to delete your account for <b>${base}</b>!`;
                    break;
                case "limited":
                    difficulty_string = `There is <b>limited availability</b> in account deletion for <b>${base}</b> (see Notes).`;
                    break;
                default:
                    difficulty_string = `It is <b>${difficulty}</b> to delete your account for <b>${base}</b>!`;
                    break;
            }
            
            document.getElementById("difficulty").innerHTML = difficulty_string;
            
            if (difficulty !== "impossible") {
                document.getElementById("link").hidden = false;
                document.getElementById("link").href = searchForSite(base, "url");
            }
            
            if (notes) {
                document.getElementById("message").innerHTML = `${convertMarkdown(notes)}`;
            } else {
                document.getElementById("message").innerText = `There are no notes for this website.`;
            }
        } catch (e) {
            document.getElementById("e").innerText = e;
        }
    });
})();
