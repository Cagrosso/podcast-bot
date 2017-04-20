const request = require('request');
const FeedParser = require('feedparser');

var req = request('http://feeds.codenewbie.org/cnpodcast.xml');
var feedparser = new FeedParser();

req.on('error', (error) => {
    console.log(error);
});

req.on('response', (response) => {

    if(response.statusCode !== 200){
        this.emit('Bad Status Code!');
    }else{
        response.pipe(feedparser);
    }
});

feedparser.on('error', (error) => {
  console.log(error);
});

feedparser.on('readable', () => {
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while (item = stream.read()) {
        console.log(`Got article: ${item.title}.`);
        console.log(`Date: ${item.pubdate}`);
        //console.log(`Description: ${item.summary}`);
        console.log(`Download Link: ${item.link}`);
    }
});