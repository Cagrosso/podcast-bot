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
    fs.writeFileSync('podcast-data.json', JSON.stringify(podcasts));
};

var printPodcast = (podcast) => {
    console.log(`Title, Pubdate : ${podcast.title}, ${podcast.pubDate}`);
    console.log(`Link: ${podcast.link}`);
    console.log(`Summary: ${podcast.summary}`);
}

var addLatestPodcast = (title, pubDate, summary, link) => {
    var podcasts = fetchPodcasts();

    var podcast = {
        title,
        pubDate,
        summary,
        link
    };

    // TODO: add podcast to the saved list ONLY IF it is newer than the one currently saved in the
    // text-file of podcasts

};
