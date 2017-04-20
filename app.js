const twit = require('twit');

const podcastFetch = require('./podcast-fetch/podcastFetch.js');

podcastFetch.fetch('http://feeds.codenewbie.org/cnpodcast.xml');
// podcastFetch.fetch('https://changelog.com/podcast/feed');