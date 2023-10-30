const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/projects', projectController.addProject);
router.delete('/projects/:projectId', projectController.deleteProject);
router.put('/projects/:projectId', projectController.editProject);

module.exports = router;
