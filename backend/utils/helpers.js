const axios = require('axios')
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent?key=${process.env.GEMINI_API_KEY}`

console.log(process.env.GEMINI_API_KEY)
console.log(process.env.YOUTUBE_API_KEY)

const getYouTubeVideoId = (urlOrId) => {
    if (/^[0-9A-Za-z_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }

    const match = urlOrId.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
};

const standardizeSentiment = (sentiment) => {
    if (!sentiment) return "neutral";
    const lower = sentiment.toLowerCase().trim();

    if (/(positive|good|great|excellent|happy|love|amazing|\bperfect\b|\bpowerful\b|❤️|❤|😍|😊|🔥|🌟)/.test(lower)) return "positive";
    if (/(negative|bad|worst|hate|awful|angry|sad|\bmiss\b|\bsad\b|😢|😭|💔|😡)/.test(lower)) return "negative";

    return "neutral";
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSentimentAndKeywords = async (commentText, retries = 1, delayMs = 500) => {
    const requestBody = {
        contents: [{
            role: "user",
            parts: [{
                text: `Analyze the following comment and return its sentiment ("positive", "negative", or "neutral") and the top 15 most relevant keywords. 
                Format: { "sentiment": "positive", "keywords": ["keyword1", "keyword2", ..., "keyword15"] }. 
                Ensure keywords are meaningful and sorted by relevance. 
                Comment: ${commentText}`
            }]
        }]
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(GEMINI_API_URL, requestBody, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Gemini Response:", JSON.stringify(response.data, null, 2));

            let responseData = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

            responseData = responseData.replace(/```json|```/g, '').trim();

            const parsedData = JSON.parse(responseData);

            const sentiment = standardizeSentiment(parsedData.sentiment || "neutral");
            const keywords = Array.isArray(parsedData.keywords) ? parsedData.keywords : [];

            return { sentiment, keywords };

        } catch (error) {
            if (error.response?.status === 429 && attempt < retries) {
                console.warn(`Rate limit hit. Retrying in ${delayMs}ms...`);
                await delay(delayMs);
                delayMs *= 2; 
            } else {
                console.error("Error processing comment:", error.message);
                return { sentiment: "neutral", keywords: [] }; 
            }
        }
    }
};

module.exports = { getYouTubeVideoId, delay, fetchSentimentAndKeywords }