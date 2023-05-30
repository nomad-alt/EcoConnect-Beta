const Organization = require("../models/organizationModel");

// Get all organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
    } else {
      res.status(200).json(organization);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new organization
const createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    const createdOrganization = await organization.save();
    res.status(201).json(createdOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an organization by ID
const updateOrganization = async (req, res) => {
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrganization) {
      res.status(404).json({ message: "Organization not found" });
    } else {
      res.status(200).json(updatedOrganization);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an organization by ID
const deleteOrganization = async (req, res) => {
  try {
    const deletedOrganization = await Organization.findByIdAndDelete(
      req.params.id
    );
    if (!deletedOrganization) {
      res.status(404).json({ message: "Organization not found" });
    } else {
      res.status(200).json({ message: "Organization deleted" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
