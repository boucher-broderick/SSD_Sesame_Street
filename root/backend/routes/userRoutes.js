const express = require("express");
const { register } = require("module");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken,currentUser);



module.exports = router;
