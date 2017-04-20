const feedparser = require('feedparser-promised');

const twitter = require('./twitter-bot/twitter_bot.js');
const db = require('./database/database.js');

var fetchPodcastFeed = (url) => {
    feedparser.parse(url).then( (items) => {
        items.forEach((item) => {
            console.log(`Title: ${item.title}`);
            console.log(`Date: ${item.pubdate}\n`);
        }, this);
    }).catch( (error) => {
        console.log(`ERROR: ${error}`);
    });
};

fetchPodcastFeed('http://feeds.codenewbie.org/cnpodcast.xml');
// fetch('https://changelog.com/podcast/feed');