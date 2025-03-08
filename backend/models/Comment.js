const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  maskedUsername: { type: String, required: true },
  commentText: { type: String, required: true },
  sentiment: { type: String, enum: ["positive", "negative", "neutral"] },
  timestamp: { type: Date, default: Date.now },
  keywords: { type: [String], default: [] }
});

module.exports = mongoose.model('Comment', commentSchema);
