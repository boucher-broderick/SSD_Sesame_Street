const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.post('/addChapter', chapterController.addChapter);
router.delete('/deleteChapter', chapterController.deleteChapter);
router.put('/editChapter', chapterController.editChapter);
router.get('/getChapters', chapterController.getChapters);

module.exports = router;