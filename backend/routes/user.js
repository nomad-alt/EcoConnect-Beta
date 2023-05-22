const express = require("express");
const { Router } = require("express");
const router = Router();

const {
  loginUser,
  signupUser,
  addLikedOrganization,
  removeLikedOrganization,
  addInterestedEvent,
  removeInterestedEvent,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");

router
  .post("/login", loginUser)
  .post("/signup", signupUser)
  .post("/:userId/likedOrganizations/:orgId", requireAuth, addLikedOrganization)
  .delete(
    "/:userId/likedOrganizations/:orgId",
    requireAuth,
    removeLikedOrganization
  )
  .post("/:userId/interestedEvents/:eventId", requireAuth, addInterestedEvent)
  .delete(
    "/:userId/interestedEvents/:eventId",
    requireAuth,
    removeInterestedEvent
  );

module.exports = router;
