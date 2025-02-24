const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController.js")
const MemberController = require("../controllers/memberController.js")
const {
    userLoginValidator,
    userRegisterValidator,
} = require("../validators/auth/user.validators.js");
const { validate } = require("../validators/validate.js");
const { verifyJWT } = require("../middlewares/auth.middlewares.js")
const {addMemberValidator, getMembersValidator} = require("../validators/member/member.validators.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/register", userRegisterValidator(), validate, UserController.registerUser)
router.post("/login", userLoginValidator(), validate, UserController.loginUser)
router.post("/refresh-token",UserController.refreshAccessToken);

// Member routes
router.post("/add-member", verifyJWT, addMemberValidator(), validate, MemberController.addMember);
router.get("/get-members", verifyJWT, getMembersValidator(), validate, MemberController.getMembers);

// Optional additional route for searching/filtering members
router.get("/search-members", verifyJWT, MemberController.searchMembers);

module.exports = router; 