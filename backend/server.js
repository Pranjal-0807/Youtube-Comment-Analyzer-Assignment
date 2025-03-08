const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const { validateYouTubeVideoId } = require('./middlewares/validateYoutubeVideoId');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use(validateYouTubeVideoId)

app.use('/api/youtube', require('./routes/youtubeRoutes'));
app.use('/api/analysis', require('./routes/analysisRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
