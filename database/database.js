const fs = require('fs');
const logger = require('simple-node-logger').createSimpleLogger('podcast-bot.log');

var fetchPodcasts = () => {
    try {
        var podcastString = fs.readFileSync('podcast-data.json');
        return JSON.parse(podcastString);
    }catch (e){
        return [];
    }
};

var savePodcasts = (podcasts) => {
    try{
        fs.writeFileSync('podcast-data.json', JSON.stringify(podcasts));
        logger.info('Saved Podcast');
    }catch(e){
        logger.error('Failed to save podcast: ', e);
    }

};

var printPodcast = (podcast) => {
    console.log(`Title, Pubdate : ${podcast.title}, ${podcast.pubDate}`);
    console.log(`Link: ${podcast.link}`);
    console.log(`Summary: ${podcast.summary}`);
}

var areValidParameters = (series, episodeTitle, pubDate, summary, link, imageLink) => {
    if(series === undefined || episodeTitle === undefined || pubDate === undefined || summary === undefined || link === undefined || imageLink === undefined){
        return false;
    }else{
        return true;
    };
}

var addLatestPodcast = (series, episodeTitle, pubDate, summary, link, imageLink) => {
    var podcasts = fetchPodcasts();

    if(!areValidParameters(series, episodeTitle, pubDate, summary, link, imageLink)){
        logger.error('Podcast input Data not valid!');
        throw new Error('Podcast input Data not valid!');
    }

    var podcast = {
        series,
        episodeTitle,
        pubDate,
        summary,
        link,
        imageLink
    };

    var savedPodcast = getLatestSavedPodcast(series);

    if(savedPodcast){
        var podcastDate = Date.parse(pubDate);
        var savedPodcastDate = Date.parse(savedPodcast.pubDate);
        if(savedPodcastDate < podcastDate){
            if(removePodcast(series)){
               logger.info(`Removed, ${savedPodcast.series}, ${savedPodcast.episodeTitle}`);
                // HAVE TO FETCH THE PODCASTS AGAIN FOOL! SO LONG TO FIND THIS!!!!!
                // IT WAS REMOVING IT THEN RE-ADDING THE PODCAST BECAUSE YOU USED THE LOCALLY STORRED ONE!
                podcasts = fetchPodcasts();
                podcasts.push(podcast);
                logger.info(`Added: ${podcast.series}, ${podcast.episodeTitle}`);
                savePodcasts(podcasts);
                return true;
            }else{
                logger.error('Failed to remove podcast');
                return false;
            }
        }else{
            logger.info('No new podcasts');
            return false;
        }
    }else{
        logger.info('New podcast series detected, adding new podcast.');
        podcasts.push(podcast);
        savePodcasts(podcasts);
        return true;
    }
};

var removePodcast = (series) => {
    // REFACTOR, RETURN THE FILTERED ARRAY, NOT A BOOLEAN.  OTHERWISE YOU HAVE TO RECALL FETCHPODCASTS;
    var podcasts = fetchPodcasts();
    var filteredPodcasts = podcasts.filter((podcast) => podcast.series !== series);
    savePodcasts(filteredPodcasts);
    
    return podcasts.length != filteredPodcasts.length;
}

var getLatestSavedPodcast = (series) =>{
    var podcasts = fetchPodcasts();

    var latestPodcast = podcasts.filter((podcast) => {
        return podcast.series === series;
    });

    if(latestPodcast.length === 0){
        return undefined;
    }else{
        return latestPodcast[0];
    }
}

var getSavedPodcastSeriesList = () => {
    var podcasts = fetchPodcasts();
    return seriesList = podcasts.map((podcast) => {return podcast.series});
}

module.exports = {
    removePodcast,
    getLatestSavedPodcast,
    addLatestPodcast,
    printPodcast,
    getSavedPodcastSeriesList
}