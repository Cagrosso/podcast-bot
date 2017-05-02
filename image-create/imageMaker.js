const webshot = require('webshot');
const fs = require('fs');
const logger = require('simple-node-logger').createSimpleLogger('podcast-bot.log');

var adaptForPodcast = (podcast) => {
    // Worst way to do this... sigh...
    var copyPhotoLayout = fs.createWriteStream(__dirname +
        '/podcastViews/' +
        podcast.series.replace(/\s/g, '') +
        'Template.html');

    var readPhotoLayout = fs.createReadStream(__dirname +
         '/views/photoLayout.html');

    readPhotoLayout.pipe(copyPhotoLayout);

    copyPhotoLayout.write(
        `<!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
        </head>
        <html>
            <body>
                <div id="table">
                    <div id="table-row">
                        <div id="left">
                            <img id="podcastPhoto" src="${podcast.imageLink}">
                        </div>
                        <div id="right">
                            <h2 id="podcastTitle">${podcast.episodeTitle}</h2>
                            <h3 id="podcastSummary">${podcast.summary}</h3>
                        </div>
                    </div>
                </div>
            </body>
        </html>\n`
    );
}

module.exports.createPhoto = (podcast) => {
    adaptForPodcast(podcast);
    var podName = podcast.series.replace(/\s/g, '');
    webshot(__dirname + '/podcastViews/' + podName + 'Template.html',
        __dirname + '/photos/' + podName + 'Photo.png',
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
            logger.error('Failed to create image: ', e);
        });
}