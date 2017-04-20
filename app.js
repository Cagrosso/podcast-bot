const feedparser = require('feedparser-promised');

const twitter = require('./twitter-bot/twitter_bot.js');
const db = require('./database/database.js');

var updatePodcast = (url) => {
    feedparser.parse(url).then( (podcasts) => {
        var latestPodcast = podcasts[0];

        db.addLatestPodcast('Changelog', latestPodcast.title, latestPodcast.pubdate, latestPodcast.summary, latestPodcast.link);
    });
};

// updatePodcast('http://feeds.codenewbie.org/cnpodcast.xml');
updatePodcast('https://changelog.com/podcast/feed');