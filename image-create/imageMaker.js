const webshot = require('webshot');

module.exports.main = () => {
    webshot(__dirname + '/views/photoLayout.html',
        'photo.png', 
        {
            siteType: 'file',
            defaultWhiteBackground: true,

        },
        (err) => {
            console.log(err);
        });
}