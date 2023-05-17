const express = require("express");
const {
  getAllBiotopes,
  getBiotopeById,
  createBiotope,
  updateBiotope,
  deleteBiotope,
} = require("../controllers/biotopeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all biotopes
router.get("/", getAllBiotopes);

// GET a single biotope by ID
router.get("/:id", getBiotopeById);

// POST a new biotope
router.post("/", createBiotope);

// PATCH an existing biotope by ID
router.patch("/:id", updateBiotope);

// DELETE a biotope by ID
router.delete("/:id", deleteBiotope);

module.exports = router;
