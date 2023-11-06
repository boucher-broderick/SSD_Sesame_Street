const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');


router.put('/editContent', contentController.editContent);
router.get('/getContent', contentController.getContent);

module.exports = router;