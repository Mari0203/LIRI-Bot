console.log('this is loaded');

exports.spotify = {
    id: ProcessingInstruction.env.SPOTIFY_ID, // Won't take 'process.env'...auto-completes it with 'ProcessingInstruction' instead...
    secret: ProcessingInstruction.env.SPOTIFY_SECRET
};
