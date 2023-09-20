const express = require('express');
const router = express.Router();
const {
    getExamples, 
    createExample, 
    getExample,
    updateExample, 
    deleteExample
    } = require('../controllers/exampleController');

// The longer way
// router.route('/').get(getExamples);
// router.route('/').post(createExample);
// router.route('/:id').get(getExample);
// router.route('/:id').put(updateExample);
// router.route('/:id').delete(deleteExample);

router.route('/').get(getExamples).post(createExample);
router.route('/:id').get(getExample).put(updateExample).delete(deleteExample);

module.exports = router;