const express = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// GET all events
router.get("/", getAllEvents);

// GET a single event by ID
router.get("/:id", getEventById);

// POST a new event
router.post("/", createEvent);

// PATCH an event by ID
router.patch("/:id", updateEvent);

// DELETE an event by ID
router.delete("/:id", deleteEvent);

module.exports = router;
