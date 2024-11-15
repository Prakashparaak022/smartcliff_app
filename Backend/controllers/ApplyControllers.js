const ApplicationFormModel = require("../models/ApplyModel");

const createApplicationForm = (req, res) => {
  const {
    a_name,
    a_email,
    a_mobileNumber,
    a_degree,
    a_yearOfPassing,
    a_marksPercentage,
    a_category,
  } = req.body;

  ApplicationFormModel.createApplicationForm(
    {
      a_name,
      a_email,
      a_mobileNumber,
      a_degree,
      a_yearOfPassing,
      a_marksPercentage,
      a_category,
    },
    (err, formId) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ a_form_id: formId });
    }
  );
};

const getApplicationFormById = (req, res) => {
  const { formId } = req.params;

  ApplicationFormModel.getApplicationFormById(formId, (err, form) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }
    res.status(200).json(form);
  });
};

const getAllApplicationForms = (req, res) => {
  ApplicationFormModel.getAllApplicationForms((err, forms) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(forms);
  });
};

const deleteApplicationFormById = (req, res) => {
  const { formId } = req.params;

  ApplicationFormModel.deleteApplicationFormById(formId, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createApplicationForm,
  getApplicationFormById,
  getAllApplicationForms,
  deleteApplicationFormById,
};
