const Biotope = require("../models/biotopesModel");

// GET all biotopes
const getAllBiotopes = async (req, res) => {
  try {
    const biotopes = await Biotope.find();
    res.status(200).json(biotopes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single biotope by ID
const getBiotopeById = async (req, res) => {
  try {
    const biotope = await Biotope.findById(req.params.id);
    res.status(200).json(biotope);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new biotope
const createBiotope = async (req, res) => {
  try {
    const biotope = await Biotope.create(req.body);
    res.status(201).json(biotope);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PATCH an existing biotope by ID
const updateBiotope = async (req, res) => {
  try {
    const biotope = await Biotope.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(biotope);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a biotope by ID
const deleteBiotope = async (req, res) => {
  try {
    await Biotope.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Biotope deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBiotopes,
  getBiotopeById,
  createBiotope,
  updateBiotope,
  deleteBiotope,
};
