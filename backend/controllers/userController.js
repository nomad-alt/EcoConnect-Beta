const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add a liked organization
const addLikedOrganization = async (req, res) => {
  const { userId, orgId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedOrganizations: orgId } },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// remove a liked organization
const removeLikedOrganization = async (req, res) => {
  const { userId, orgId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedOrganizations: orgId } },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add an interested event
const addInterestedEvent = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { interestedEvents: eventId } },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// remove an interested event
const removeInterestedEvent = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { interestedEvents: eventId } },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  addLikedOrganization,
  removeLikedOrganization,
  addInterestedEvent,
  removeInterestedEvent,
};
