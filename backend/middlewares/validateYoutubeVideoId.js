const { getYouTubeVideoId } = require('../utils/helpers');

const validateYouTubeVideoId = (req, res, next) => {
    const videoId = req.query.videoId || req.body.videoId;

    if (!videoId) {
        return res.status(400).json({ message: 'Video ID is required' });
    }

    const id = getYouTubeVideoId(videoId);
    if (!id) {
        return res.status(400).json({ message: 'Invalid video URL' });
    }

    req.videoId = id; 
    next();
};

module.exports = { validateYouTubeVideoId };
