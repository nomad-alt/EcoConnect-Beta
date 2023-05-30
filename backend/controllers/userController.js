const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const {
  Types: { ObjectId },
} = require("mongoose")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

const loginUser = async (req, res) => {
  // login a user
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    // include user._id in the response
    res.status(200).json({ _id: user._id.toString(), email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const signupUser = async (req, res) => {
  // signup a user
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    if (!user) {
      throw new Error("User registration failed")
    }

    // create a token
    const token = createToken(user._id)

    // include user._id in the response
    res.status(200).json({ _id: user._id.toString(), email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const addLikedOrganization = async (req, res) => {
  console.log("addLikedOrganization route hit")
  const { userId, orgId } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedOrganizations: new ObjectId(orgId) } },
      { new: true }
    )

    if (!user) {
      throw new Error("User not found")
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeLikedOrganization = async (req, res) => {
  // remove a liked organization
  const { userId, orgId } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedOrganizations: orgId } },
      { new: true }
    )

    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const addInterestedEvent = async (req, res) => {
  // add an interested event
  const { userId, eventId } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { interestedEvents: eventId } },
      { new: true }
    )

    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const removeInterestedEvent = async (req, res) => {
  // remove an interested event
  const { userId, eventId } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { interestedEvents: eventId } },
      { new: true }
    )

    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error("User not found")
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getLikedOrganizations = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
      .populate("likedOrganizations")
      .exec()
    // handle user
    res.status(200).json({ likedOrganizations: user.likedOrganizations })
  } catch (error) {
    console.error("Error fetching liked organizations:", error)
    // return more detailed error message to the client
    res
      .status(500)
      .json({ error: `Error fetching liked organizations: ${error.message}` })
  }
}

module.exports = {
  loginUser,
  signupUser,
  addLikedOrganization,
  removeLikedOrganization,
  addInterestedEvent,
  removeInterestedEvent,
  getUser,
  getLikedOrganizations,
}
