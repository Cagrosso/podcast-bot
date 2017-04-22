const feedparser = require('feedparser-promised');

const twitter = require('./twitter-bot/twitter_bot.js');
const db = require('./database/database.js');
const utils = require('./utils/utils.js');

var updatePodcast = (url) => {
    feedparser.parse(url).then( (podcasts) => {
        var latestPodcast = podcasts[0];

        db.addLatestPodcast(latestPodcast.meta.title, latestPodcast.title, latestPodcast.pubdate, latestPodcast['itunes:summary']['#'], latestPodcast.link);
    }).catch((error) => {
        console.log(error);
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