const webshot = require('webshot');

module.exports.adaptForPodcast = (podcast) => {
    
}

module.exports.createPhoto = () => {
    webshot(__dirname + '/views/photoLayout.html',
        __dirname + '/photos/photo.png', 
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