const CorporateModel = require("../models/CorporateModel");

const createCorporate = (req, res) => {
  const { orgName, orgEmail, orgPhone, service } = req.body;

  CorporateModel.createCorporate(
    { orgName, orgEmail, orgPhone, service },
    (err, corporateId) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ org_id: corporateId });
    }
  );
};

const getCorporates = (req, res) => {
  CorporateModel.getCorporates((err, corporates) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(corporates);
  });
};

const getSingleCorporate = (req, res) => {
  const { org_id } = req.params;

  CorporateModel.getCorporateById(org_id, (err, corporate) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!corporate) {
      res.status(404).json({ error: "Corporate not found" });
      return;
    }
    res.status(200).json(corporate);
  });
};

const updateCorporate = (req, res) => {
  const { org_id } = req.params;

  CorporateModel.updateCorporate(org_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteCorporate = (req, res) => {
  const { org_id } = req.params;

  CorporateModel.deleteCorporate(org_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createCorporate,
  getCorporates,
  getSingleCorporate,
  updateCorporate,
  deleteCorporate,
};
