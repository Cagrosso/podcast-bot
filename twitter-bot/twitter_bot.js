const twit = require('twit');
const fs = require('fs');
const path = require('path');

const config = require('./config.js');

var T = new twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

var postPhoto = (podcast) => {
    var projectRootPath = path.dirname(require.main.filename);
    var seriesSansSpaces = podcast.series.replace(/\s/g, '');

    var photoLocation = projectRootPath +
        '/image-create/photos/' +
        seriesSansSpaces +
        'Photo.png';

    var status = 'New podcast released from ' +
        podcast.series +
        '!' +
        ' Get it here: ' +
        podcast.link +
        ' #' +
        seriesSansSpaces;

    var b64content = fs.readFileSync(photoLocation, {
        encoding: 'base64'
    });

    // first we must post the media to Twitter 
    T.post('media/upload', {
        media_data: b64content
    }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and 
        // other text-based presentations and interpreters 
        var mediaIdStr = data.media_id_string
        var altText = "Summary of new podcast from: " + podcast.series;
        var meta_params = {
            media_id: mediaIdStr,
            alt_text: {
                text: altText
            }
        }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet) 
                var params = {
                    status: status,
                    media_ids: [mediaIdStr]
                }

                T.post('statuses/update', params, function (err, data, response) {
                    console.log(data)
                })
            }
        })
    })
}

module.exports = {
    postPhoto
}