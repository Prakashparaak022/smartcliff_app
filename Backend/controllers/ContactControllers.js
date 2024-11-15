const ContactModel = require('../models/ContactModel');

const createContact = (req, res) => {
  const { contact_name, contact_email, contact_phoneNumber, contact_message } = req.body;

  ContactModel.createContact(
    { contact_name, contact_email, contact_phoneNumber, contact_message },
    (err, contactId) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ contact_id: contactId });
    }
  );
};

const getContacts = (req, res) => {
  ContactModel.getContacts((err, contacts) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(contacts);
  });
};

const getSingleContact = (req, res) => {
  const { contact_id } = req.params;

  ContactModel.getContactById(contact_id, (err, contact) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }
    res.status(200).json(contact);
  });
};

const updateContact = (req, res) => {
  const { contact_id } = req.params;

  ContactModel.updateContact(contact_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteContact = (req, res) => {
  const { contact_id } = req.params;

  ContactModel.deleteContact(contact_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createContact,
  getContacts,
  getSingleContact,
  updateContact,
  deleteContact,
};
