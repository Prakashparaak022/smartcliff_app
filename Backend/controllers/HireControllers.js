const HireFormModel = require("../models/HireModel");

const createHireForm = (req, res) => {
  const { h_name, h_email, h_phoneNumber, h_companyName, h_hiringEnquiry, h_message, h_designation } = req.body;

  HireFormModel.createHireForm({ h_name, h_email, h_phoneNumber, h_companyName, h_hiringEnquiry, h_message, h_designation }, (err, hireFormId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ h_id: hireFormId });
  });
};

const getHireForms = (req, res) => {
  HireFormModel.getHireForms((err, hireForms) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(hireForms);
  });
};

const getSingleHireForm = (req, res) => {
  const { h_id } = req.params;

  HireFormModel.getHireFormById(h_id, (err, hireForm) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!hireForm) {
      res.status(404).json({ error: "HireForm not found" });
      return;
    }
    res.status(200).json(hireForm);
  });
};

const deleteHireForm = (req, res) => {
  const { h_id } = req.params;

  HireFormModel.deleteHireForm(h_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createHireForm,
  getHireForms,
  getSingleHireForm,
  deleteHireForm,
};
