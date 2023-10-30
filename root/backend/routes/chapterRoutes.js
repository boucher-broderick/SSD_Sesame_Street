const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');

router.post('/chapters', chapterController.addChapter);
router.delete('/chapters/:chapterId', chapterController.deleteChapter);
router.put('/chapters/:chapterId', chapterController.editChapter);

module.exports = router;