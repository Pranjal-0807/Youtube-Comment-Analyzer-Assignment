const router = require('express').Router();
const { analyzeComments, downloadCSV } = require('../controllers/analysisController');

router.post('/analyze-comments', analyzeComments);
router.get('/download-csv', downloadCSV);

module.exports = router;
