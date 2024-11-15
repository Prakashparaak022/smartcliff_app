const InstitutionModel = require("../models/InstituteModel");

const createInstitution = (req, res) => {
  const { collegeName, collegeEmail, collegePhone,service } = req.body;

  InstitutionModel.createInstitution({ collegeName, collegeEmail, collegePhone,service}, (err, institutionId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ coll_id: institutionId });
  });
};

const getInstitutions = (req, res) => {
  InstitutionModel.getInstitutions((err, institutions) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(institutions);
  });
};

const getSingleInstitution = (req, res) => {
  const { coll_id } = req.params;

  InstitutionModel.getInstitutionById(coll_id, (err, institution) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!institution) {
      res.status(404).json({ error: "Institution not found" });
      return;
    }
    res.status(200).json(institution);
  });
};

const updateInstitution = (req, res) => {
  const { coll_id } = req.params;

  InstitutionModel.updateInstitution(coll_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteInstitution = (req, res) => {
  const { coll_id } = req.params;

  InstitutionModel.deleteInstitution(coll_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createInstitution,
  getInstitutions,
  getSingleInstitution,
  updateInstitution,
  deleteInstitution,
};
