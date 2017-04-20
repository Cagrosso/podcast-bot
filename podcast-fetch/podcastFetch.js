const feedparser = require('feedparser-promised');

var fetch = (url) => {
    feedparser.parse(url).then( (items) => {
        items.forEach((item) => {
            console.log(`Title: ${item.title}, ${item.pubdate}`);
        }, this);
    }).catch( (error) => {
        console.log(`ERROR: ${error}`);
    });
};

module.exports = {
    fetch
};