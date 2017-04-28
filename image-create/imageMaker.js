const webshot = require('webshot');

module.exports.adaptForPodcast

module.exports.createPhoto = () => {
    webshot(__dirname + '/views/photoLayout.html',
        __dirname + '/photos/photo.png', 
        {
            windowSize: {
                width: 600,
                height: 600
            },
            siteType: 'file',
            defaultWhiteBackground: true,

        },
        (err) => {
            console.log(err);
        });
}