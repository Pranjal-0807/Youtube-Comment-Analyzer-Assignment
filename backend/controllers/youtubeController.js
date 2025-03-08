const axios = require('axios');
const Comment = require('../models/Comment');

const fetchExistingComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.videoId }).sort({ timestamp: -1 });
    res.status(200).json({ message: 'Comments fetched', comments });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
}

const fetchComments = async (req, res) => {
  try {
    let allComments = [];
    let nextPageToken = null;
    let batchSize = 5;
    let maxBatches = 1;

    for (let i = 0; i < maxBatches; i++) {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads`, {
        params: {
          part: 'snippet',
          videoId: req.videoId,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: batchSize,
          pageToken: nextPageToken
        },
      });

      const comments = response.data.items.map(item => ({
        videoId: req.videoId,
        maskedUsername: `User_${Math.random().toString(36).substring(7)}`,
        commentText: item.snippet.topLevelComment.snippet.textDisplay,
        timestamp: item.snippet.topLevelComment.snippet.publishedAt,
      }));

      allComments.push(...comments);
      nextPageToken = response.data.nextPageToken;

      if (!nextPageToken) break;
    }

    if (allComments.length > 0) {
      await Comment.insertMany(allComments, { ordered: false });
    }

    res.status(200).json({ message: 'Comments fetched and stored', comments: allComments });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

module.exports = { fetchComments, fetchExistingComments };
