const fs = require('fs');

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
        console.log('Saved Podcasts');
    }catch(e){
        console.log('Failed to save podcasts');
        console.log(e);
    }

};

var printPodcast = (podcast) => {
    console.log(`Title, Pubdate : ${podcast.title}, ${podcast.pubDate}`);
    console.log(`Link: ${podcast.link}`);
    console.log(`Summary: ${podcast.summary}`);
}

var addLatestPodcast = (series, episodeTitle, pubDate, summary, link) => {
    var podcasts = fetchPodcasts();

    var podcast = {
        series,
        episodeTitle,
        pubDate,
        summary,
        link
    };

    var savedPodcast = getLatestSavedPodcast(series);

    debugger;

    if(savedPodcast){
        var podcastDate = Date.parse(pubDate);
        var savedPodcastDate = Date.parse(savedPodcast.pubDate);
        debugger;
        if(savedPodcastDate < podcastDate){
            if(removePodcast(series)){
                console.log(`Removed, ${savedPodcast.series}, ${savedPodcast.title}`);
                podcasts.push(podcast);
                console.log(`Added: ${podcast.series}, ${podcast.title}`);
                savePodcasts(podcasts);
            }else{
                console.log('Failed to remove podcast');
            }
        }else{
            console.log('No new podcasts');
        }
    }else{
        console.log('New podcast series detected, adding new podcast.');
        podcasts.push(podcast);
        savePodcasts(podcasts);
    }
};

var removePodcast = (series) => {
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

    debugger;

    if(latestPodcast.length === 0){
        return undefined;
    }else if(latestPodcast.length > 1){
        throw new Error('More than one podcast of that series saved!');    
    }else{
        return latestPodcast[0];
    }
}

module.exports = {
    removePodcast,
    getLatestSavedPodcast,
    addLatestPodcast,
    printPodcast
}