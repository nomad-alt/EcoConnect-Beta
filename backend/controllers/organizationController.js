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

/* const Organization = require("../models/organizationModel");
const mongoose = require("mongoose");

// get all organizations
const getOrganizations = async (req, res) => {
  const organizations = await Organization.find({}).sort({ createdAt: -1 });

  res.status(200).json(organizations);
};

// get a single organization
const getOrganization = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such organization" });
  }

  const organization = await Organization.findById(id);

  if (!organization) {
    return res.status(404).json({ error: "No such organization" });
  }

  res.status(200).json(organization);
};

// create a new organization
const createOrganization = async (req, res) => {
  const { title, description, mission } = req.body;

  // add to the database
  try {
    const organization = await Organization.create({
      title,
      description,
      mission,
    });
    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an organization
const deleteOrganization = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such organization" });
  }

  const organization = await Organization.findOneAndDelete({ _id: id });

  if (!organization) {
    return res.status(400).json({ error: "No such organization" });
  }

  res.status(200).json(organization);
};

// update an organization
const updateOrganization = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such organization" });
  }

  const organization = await Organization.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!organization) {
    return res.status(400).json({ error: "No such organization" });
  }

  res.status(200).json(organization);
};

module.exports = {
  getOrganizations,
  getOrganization,
  createOrganization,
  deleteOrganization,
  updateOrganization,
};
 */
