const ServiceModel = require("../models/ServiceListModel");

const createService = (req, res) => {
  const { s_id, service } = req.body;

  ServiceModel.createService({ s_id, service }, (err, serviceId) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ service_id: serviceId });
  });
};

const getServices = (req, res) => {
  ServiceModel.getServices((err, services) => {
    if (err) {  
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(services);
  });
};

const getSingleService = (req, res) => {
  const { s_id } = req.params;

  ServiceModel.getSingleService(s_id, (err, service) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.status(200).json(service);
  });
};

const updateService = (req, res) => {
  const { s_id } = req.params;

  ServiceModel.updateService(s_id, req.body, (err, updatedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ updatedCount });
  });
};

const deleteService = (req, res) => {
  const { s_id } = req.params;

  ServiceModel.deleteService(s_id, (err, deletedCount) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ deletedCount });
  });
};

module.exports = {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
};
