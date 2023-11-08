const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/addProject', projectController.addProject);
router.delete('/deleteProject', projectController.deleteProject);
router.put('/editProject', projectController.editProject);
router.get('/getProjects', projectController.getProjects);

module.exports = router;
