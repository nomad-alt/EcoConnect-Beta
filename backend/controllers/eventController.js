const Event = require("../models/eventModel");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json(updatedEvent);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res.status(200).json({ message: "Event deleted" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
