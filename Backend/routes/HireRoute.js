const express = require('express');
const router = express.Router();
const hireFormController = require('../controllers/HireControllers');


router.post('/', hireFormController.createHireForm);
router.get('/', hireFormController.getHireForms);
router.get('/:h_id', hireFormController.getSingleHireForm);
router.delete('/:h_id', hireFormController.deleteHireForm);

module.exports = router;
