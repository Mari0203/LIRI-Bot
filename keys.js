console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID, 
    secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
    APP_ID: process.env.APP_ID
};
