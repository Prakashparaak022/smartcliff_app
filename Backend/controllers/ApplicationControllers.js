const ApplicationFormModel = require("../models/ApplicationModel");

const createApplicationForm = (req, res) => {
  const {
    a_name,
    a_email,
    a_mobileNumber,
    a_degree,
    a_yearOfPassing,
    a_marksPercentage,
    a_category,
    c_id,
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
      c_id,
    },
    (err, applicationFormId) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ a_form_id: applicationFormId });
    }
  );
};

const getApplicationForms = (req, res) => {
  ApplicationFormModel.getApplicationForms((err, applicationForms) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(applicationForms);
  });
};

const getApplicationFormById = (req, res) => {
  const { a_form_id } = req.params;

  ApplicationFormModel.getApplicationFormById(
    a_form_id,
    (err, applicationForm) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (!applicationForm) {
        res.status(404).json({ error: "Application form not found" });
        return;
      }
      res.status(200).json(applicationForm);
    }
  );
};

const deleteApplicationForm = (req, res) => {
  const { a_form_id } = req.params;

  ApplicationFormModel.deleteApplicationForm(a_form_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (deletedCount === 0) {
      res.status(404).json({ error: "Application form not found" });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createApplicationForm,
  getApplicationForms,
  getApplicationFormById,
  deleteApplicationForm,
};
