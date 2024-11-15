const express = require('express');
const router = express.Router();

const {
  createApplicationForm,
  getApplicationForms,
  getApplicationFormById,
  deleteApplicationForm,
} = require('../controllers/ApplicationControllers');

router.post('/', createApplicationForm);
router.get('/', getApplicationForms);
router.get('/:a_form_id', getApplicationFormById);
router.delete('/:a_form_id', deleteApplicationForm);

module.exports = router;
