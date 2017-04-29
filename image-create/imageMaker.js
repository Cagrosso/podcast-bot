const webshot = require('webshot');
const hb = require("handlebars");

var adaptForPodcast = (podcast) => {
    var source = __dirname + '/views/photoLayout.html';
    var template = hb.compile(source);
    debugger;
    var context = {
        podcastTitle: podcast.episodeTitle,
        podcastSummary: podcast.summary,
        podcastImage: podcast.imageLink
    }

    return template(context);
}

module.exports.createPhoto = (podcast) => {
    var html = adaptForPodcast(podcast);
    webshot(html,
        __dirname + '/photos/' + podcast.series + '.png', 
        {
            windowSize: {
                width: 730,
                height: 360
            },
            siteType: 'file',
            defaultWhiteBackground: true,
            quality: 80
        },
        (err) => {
            console.log(err);
        });
}