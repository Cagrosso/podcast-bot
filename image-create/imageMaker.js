const webshot = require('webshot');
const fs = require('fs');

var adaptForPodcast = (podcast) => {
    // Worst way to do this... sigh...
    var adaptedTemplate = fs.createReadStream(__dirname + '/views/photoLayout.html')
    .pipe(fs.createWriteStream(__dirname + '/podcastViews/' + podcast.series.replace(/\s/g, '') + 'Template.html'));


}

module.exports.createPhoto = (podcast) => {
    adaptForPodcast(podcast);
    // webshot(__dirname + '/views/photoLayout.html',
    //     __dirname + '/photos/photo.png', 
    //     {
    //         windowSize: {
    //             width: 730,
    //             height: 360
    //         },
    //         siteType: 'file',
    //         defaultWhiteBackground: true,
    //         quality: 80
    //     },
    //     (err) => {
    //         console.log(err);
    //     });
}