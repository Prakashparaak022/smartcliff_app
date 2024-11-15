const EnquiryModel = require("../models/EnquiryModel");

const createEnquiry = (req, res) => {
  const { e_name, e_email, e_phone_number, e_message, c_id,category } = req.body;
  
  EnquiryModel.createEnquiry({ e_name, e_email, e_phone_number, e_message, c_id,category }, (err, enquiryId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ e_id: enquiryId });
  });
};

const getEnquiries = (req, res) => {
  EnquiryModel.getEnquiries((err, enquiries) => {
    if (err) {  
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(enquiries);
  });
};

const getSingleEnquiry = (req, res) => {
  const { e_id } = req.params;

  EnquiryModel.getEnquiryById(e_id, (err, enquiry) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!enquiry) {
      res.status(404).json({ error: "Enquiry not found" });
      return;
    }
    res.status(200).json(enquiry);
  });
};

const updateEnquiry = (req, res) => {
  const { e_id } = req.params;

  EnquiryModel.updateEnquiry(e_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteEnquiry = (req, res) => {
  const { e_id } = req.params;

  EnquiryModel.deleteEnquiry(e_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getSingleEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
