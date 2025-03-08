const router = require('express').Router();
const { fetchComments, fetchExistingComments } = require('../controllers/youtubeController');

router.get('/fetch-comments', fetchComments);
router.get('/fetch-existing-comments', fetchExistingComments);

module.exports = router;
