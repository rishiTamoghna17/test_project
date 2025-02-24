const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController.js")
const {
    userLoginValidator,
    userRegisterValidator,
} = require("../validators/auth/user.validators.js");
const { validate } = require("../validators/validate.js");
// const { authenticate, authorization, specialAuthorization } = require("../middleware/auth")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/register", userRegisterValidator(), validate, UserController.registerUser)
router.post("/login", userLoginValidator(), validate, UserController.loginUser)
router.post("/refresh-token",UserController.refreshAccessToken);

//add members
// router.post("/add-members", UserController.addMembers)

module.exports = router; 