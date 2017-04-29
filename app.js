const feedparser = require('feedparser-promised');

const twitter = require('./twitter-bot/twitter_bot.js');
const imageMaker = require('./image-create/imageMaker.js');
const db = require('./database/database.js');
const utils = require('./utils/utils.js');

var updatePodcast = (url) => {
    feedparser.parse(url).then( (podcasts) => {
        var latestPodcast = podcasts[0];

        console.log(latestPodcast.meta.title);

        db.addLatestPodcast(latestPodcast.meta.title,
            latestPodcast.title,
            latestPodcast.pubdate,
            latestPodcast['itunes:summary']['#'],
            latestPodcast.link,
            latestPodcast.meta['itunes:image']['@']['href']
            );
        
        console.log('\n');
    }).catch((error) => {
        console.log(error);
    });
};

var generateImages = () => {
    var seriesList = db.getSavedPodcastSeriesList();
    seriesList.map((series) => {
        var podcast = db.getLatestSavedPodcast(series);
        imageMaker.createPhoto(podcast);
    });
};

// CodeNewbie
updatePodcast('http://feeds.codenewbie.org/cnpodcast.xml');
// The Changelog
updatePodcast('https://changelog.com/podcast/feed');
// JSParty
updatePodcast('https://changelog.com/jsparty/feed');
// Request For Commits
updatePodcast('https://changelog.com/rfc/feed');
// Software Engineering Daily
updatePodcast('http://softwareengineeringdaily.com/feed/podcast/');
// JavascriptJabber
updatePodcast('https://feeds.feedwrench.com/JavaScriptJabber.rss');

generateImages();

// GONNA NEED TO REFACTOR PARAMETER INPUT TO GET THIS TO WORK
// SUSPECT THAT BEST METHOD WOULD BE TO CREATE A PODCAST OBJECT TO
// GET MORE GRANULAR CONTROL OVER INPUT PARAMETERS AND WHERE TO FIND
// THE NEEDED INFORMATION
// Programming Electronics Podcast
// updatePodcast('http://programmingelectronics.libsyn.com/rss');