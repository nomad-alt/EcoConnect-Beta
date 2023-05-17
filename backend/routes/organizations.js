const express = require("express");
const {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");
/* const requireAuth = require("../middleware/requireAuth"); */

const router = express.Router();

/* // require auth for all workout routes
router.use(requireAuth); */

// GET all organizations
router.get("/", getAllOrganizations);

// GET a single organization
router.get("/:id", getOrganizationById);

// POST a new organization
router.post("/", createOrganization);

// DELETE an organization
router.delete("/:id", deleteOrganization);

// UPDATE an organization
router.patch("/:id", updateOrganization);

module.exports = router;
