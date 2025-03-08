const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const Comment = require('../models/Comment');
const { delay, fetchSentimentAndKeywords } = require('../utils/helpers')

const analyzeComments = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.videoId });

        if (!comments.length) return res.status(404).json({ message: "No comments found" });

        const analysisResults = [];
        for (const comment of comments) {
            const { sentiment, keywords } = await fetchSentimentAndKeywords(comment.commentText);
            analysisResults.push({ _id: comment._id, sentiment, keywords });
            await delay(250); 
        }

        await Comment.bulkWrite(
            analysisResults.map(({ _id, sentiment, keywords }) => ({
                updateOne: { filter: { _id }, update: { $set: { sentiment, keywords } } }
            }))
        );

        const updatedComments = await Comment.find({ videoId: req.videoId });

        res.status(200).json({ message: "Sentiment & keyword analysis completed", comments: updatedComments });

    } catch (error) {
        console.error("Error analyzing comments:", error.response?.data || error.message);
        res.status(500).json({ message: 'Error analyzing comments', error: error.response?.data || error.message });
    }
};

const downloadCSV = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.videoId });

        if (!comments.length) {
            return res.status(404).json({ message: 'No comments found' });
        }

        const csvFields = ['Username', 'Comment', 'Sentiment', 'Keywords', 'Timestamp'];
        const csvData = comments.map(comment => ({
            Username: comment.maskedUsername,
            Comment: `"${comment.commentText.replace(/"/g, '""')}"`, 
            Sentiment: comment.sentiment || 'N/A',
            Timestamp: new Date(comment.timestamp).toLocaleString(), 
            Keywords: comment.keywords ? comment.keywords.join(', ') : 'N/A',
        }));

        const json2csvParser = new Parser({ fields: csvFields });
        const csv = json2csvParser.parse(csvData);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=comments_analysis_${req.videoId}.csv`);
        res.send(csv);

    } catch (error) {
        res.status(500).json({ message: 'Error generating CSV', error });
    }
}


module.exports = { analyzeComments, downloadCSV };
