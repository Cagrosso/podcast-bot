const feedparser = require('feedparser-promised');

const twitter = require('./twitter-bot/twitter_bot.js');

var fetch = (url) => {
    feedparser.parse(url).then( (items) => {
        items.forEach((item) => {
            console.log(`Title: ${item.title}`);
        }, this);
    }).catch( (error) => {
        console.log(`ERROR: ${error}`);
    });
};

module.exports = {
    fetch
};

fetch('http://feeds.codenewbie.org/cnpodcast.xml');
fetch('https://changelog.com/podcast/feed');