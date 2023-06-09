class MediaBias {
    constructor() {
        throw new Error("Cannot construct abstract class MediaBias");
    }

    static name(domain) {
        const name = MediaBias.domains[domain];
        if (name === undefined) {
            throw new Error("We don't have this domain in our database. Please contact us if you feel it should be added.");
        }
        return name;
    }
    static lookup(domain) {
        const name = MediaBias.name(domain);
        const data = MediaBias.data[name];
        if (data === undefined) {
            throw new Error("It seems that we have that website in our databse, but we don't have any data on it. Please contact us to let us know about this bug.")
        }
        data.push(name);
        return data;
    }

    static domains = {
        "abc.com": "ABC",
        "afp.com": "AFP",
        "aljareeza.com": "Al Jazeera US/Canada News",
        "apnews.com": "AP",
        "axios.com": "Axios",
        "bbc.com": "BBC",
        "bloomberg.com": "Bloomberg",
        "buzzfeednews.com": "BuzzFeed News",
        "cbs.com": "CBS",
        "csmonitor.com": "Christian Science Monitor",
        "cnn.com": "CNN",
        "c-span.org": "CSPAN",
        "thedailybeast.com": "Daily Beast",
        "davidwolfe.com": "David Wolfe",
        "democracynow.org": "Democracy Now",
        "ft.com": "Financial Times",
        "forbes.com": "Forbes",
        "foreignpolicy.com": "Foreign Policy",
        "fortune.com": "Fortune",
        "foxnews.com": "Fox",
        "ijr.com": "IJR",
        "latimes.com": "LA Times",
        "marketwatch.com": "Marketwatch",
        "nationalreview.com": "National Review",
        "nbc.com": "NBC",
        "newrepublic.com": "New Republic",
        "nytimes.com": "New York Times",
        "newsmax.com": "NewsMax",
        "npr.org": "NPR",
        "ozy.com": "OZY",
        "pbs.org": "PBS",
        "politico.com": "Politico",
        "propublica.org": "ProPublica",
        "qz.com": "Quartz",
        "reason.com": "Reason",
        "reuters.com": "Reuters",
        "slate.com": "Slate",
        "talkingpointsmemo.com": "Talking Points Memo",
        "theatlantic.com": "The Atlantic",
        "theblaze.com": "The Blaze",
        "thehill.com": "The Hill",
        "theguardian.com": "The Guardian",
        "theverge.com": "The Verge",
        "time.com": "Time",
        "theintercept.com": "The Intercept",
        "thefederalist.com": "The Federalist",
        "thefiscaltimes.com": "The Fiscal Times",
        "thegatewaypundit.com": "The Gateway Pundit",
        "theguardian.com": "The Guardian",
        "newyorker.com": "The New Yorker",
        "theskimm.com": "The Skimm",
        "theweek.com": "The Week",
        "theweeklystandard.com": "The Weekly Standard",
        "thinkprogress.org": "ThinkProgress",
        "usatoday.com": "USA Today",
        "economist.com": "The Economist",
        "vice.com": "Vice",
        "vox.com": "Vox",
        "washingtonpost.com": "Washington Post",
        "wsj.com": "Wall Street Journal",
        "washingtonfreebeacon.com": "Washington Free Beacon",
        "thehill.com": "The Hill",
    };
    static data = {
        "ABC": ["57", "0"],
        "AFP": ["62", "0"],
        "Al Jazeera US/Canada News": ["54", "-1"],
        "AP": ["62", "0"],
        "Axios": ["52", "-2"],
        "BBC": ["54", "-3"],
        "Bloomberg": ["58", "4"],
        "BuzzFeed News": ["51", "-15"],
        "CBS": ["57", "4"],
        "Christian Science Monitor": ["54", "6"],
        "CNN": ["32", "-6"],
        "CSPAN": ["59", "0"],
        "Daily Beast": ["41", "-21"],
        "David Wolfe": ["2", "-32"],
        "Democracy Now": ["48", "-19"],
        "Financial Times": ["48", "3"],
        "Forbes": ["44", "3"],
        "Foreign Policy": ["45", "9"],
        "Fortune": ["46", "5"],
        "Fox": ["20", "27"],
        "IJR": ["41", "2"],
        "LA Times": ["58", "-6"],
        "Marketwatch": ["50", "5"],
        "National Review": ["51", "20"],
        "NBC": ["57", "-3"],
        "New Republic": ["46", "-19"],
        "New York Times": ["52", "-5"],
        "NewsMax": ["43", "-28"],
        "NPR": ["56", "-5"],
        "OZY": ["43", "0"],
        "PBS": ["57", "-5"],
        "Politico": ["55", "-3"],
        "ProPublica": ["46", "-5"],
        "Quartz": ["44", "-5"],
        "Reason": ["42", "18"],
        "Reuters": ["62", "0"],
        "Slate": ["43", "-20"],
        "Talking Points Memo": ["41", "-13"],
        "The Atlantic": ["46", "-15"],
        "The Economist": ["48", "4"],
        "The Guardian": ["48", "-6"],
        "The Hill": ["54", "9"],
        "The Nation": ["47", "-17"],
        "The New Yorker": ["47", "-9"],
        "The Skimm": ["49", "-2"],
        "The Week": ["44", "-10"],
        "The Weekly Standard": ["46", "18"],
        "Think Progress": ["42", "-13"],
        "Time": ["43", "-1"],
        "USA Today": ["52", "0"],
        "Vice": ["42", "-10"],
        "Vox": ["43", "-16"],
        "Wall Street Journal": ["53", "11"],
        "Washington Free Beacon": ["41", "24"],
        "Washington Post": ["51", "-10"]
    };
}
