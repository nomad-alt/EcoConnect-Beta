const router = require("express").Router()

const {
  loginUser,
  signupUser,
  addLikedOrganization,
  removeLikedOrganization,
  addInterestedEvent,
  removeInterestedEvent,
  getLikedOrganizations,
  getUser,
} = require("../controllers/userController")

const requireAuth = require("../middleware/requireAuth")

router.post("/login", loginUser)
router.post("/signup", signupUser)
router.post(
  "/:userId/likedOrganizations/:orgId",
  requireAuth,
  addLikedOrganization
)
router.delete(
  "/:userId/likedOrganizations/:orgId",
  requireAuth,
  removeLikedOrganization
)
router.post(
  "/:userId/interestedEvents/:eventId",
  requireAuth,
  addInterestedEvent
)
router.delete(
  "/:userId/interestedEvents/:eventId",
  requireAuth,
  removeInterestedEvent
)
router.get("/:userId", requireAuth, getUser)
router.get("/:userId/likedOrganizations", requireAuth, getLikedOrganizations)

module.exports = router
