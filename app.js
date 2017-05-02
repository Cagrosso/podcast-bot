const feedparser = require('feedparser-promised');
const cron = require('cron')
const logger = require('simple-node-logger').createSimpleLogger('podcast-bot.log');

const twitter = require('./twitter-bot/twitter_bot.js');
const imageMaker = require('./image-create/imageMaker.js');
const db = require('./database/database.js');
const utils = require('./utils/utils.js');

var updatePodcast = (url) => {
    // parse the podcast rss feeds
    // REFACTOR: MOVE PARSING TO ITS OWN FILE.
    feedparser.parse(url).then((podcasts) => {
        var latestPodcast = podcasts[0];

        logger.info('Getting ', latestPodcast.meta.title);

        if (db.addLatestPodcast(latestPodcast.meta.title,
                latestPodcast.title,
                latestPodcast.pubdate,
                latestPodcast['itunes:summary']['#'],
                latestPodcast.link,
                latestPodcast.meta['itunes:image']['@']['href']
            )) {
            latestPodcast = db.getLatestSavedPodcast(latestPodcast.meta.title);
            generateImages(latestPodcast);
            setTimeout(() => {
                twitter.postPhoto(latestPodcast);
            }, 20000)
        }

    }).catch((error) => {
        logger.error(error);
    });
};

var generateImages = (podcast) => {
    // run the image generator
    imageMaker.createPhoto(podcast);
};


var job1 = new cron.CronJob({
    // Runs every 4 hours
    cronTime: '0 0 */4 * * *',
    onTick: () => {
        // The Changelog
        updatePodcast('https://changelog.com/podcast/feed');
        // CodeNewbie
        updatePodcast('http://feeds.codenewbie.org/cnpodcast.xml');
        // JSParty
        updatePodcast('https://changelog.com/jsparty/feed');
        // Request For Commits
        updatePodcast('https://changelog.com/rfc/feed');
        // Software Engineering Daily
        updatePodcast('http://softwareengineeringdaily.com/feed/podcast/');
        // JavascriptJabber
        updatePodcast('https://feeds.feedwrench.com/JavaScriptJabber.rss');
        // Spotlight
        updatePodcast('https://changelog.com/spotlight/feed');
        // Go Time
        updatePodcast('https://changelog.com/gotime/feed');
    },
    start: true,
    timeZone: 'America/New_York'
});

logger.info('Starting...');
console.log('Starting...');

console.log(job1.running);



// GONNA NEED TO REFACTOR PARAMETER INPUT TO GET THIS TO WORK
// SUSPECT THAT BEST METHOD WOULD BE TO CREATE A PODCAST OBJECT TO
// GET MORE GRANULAR CONTROL OVER INPUT PARAMETERS AND WHERE TO FIND
// THE NEEDED INFORMATION
// Programming Electronics Podcast
// updatePodcast('http://programmingelectronics.libsyn.com/rss');