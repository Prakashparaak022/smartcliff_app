const express = require('express');
const router = express.Router();

const {
  createContact,
  getContacts,
  getSingleContact,
  updateContact,
  deleteContact,
} = require('../controllers/ContactControllers');

router.post('/', createContact);
router.get('/', getContacts);
router.get('/:contact_id', getSingleContact);
router.patch('/:contact_id', updateContact);
router.delete('/:contact_id', deleteContact);

module.exports = router;
