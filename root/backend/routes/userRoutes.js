const express = require("express");
const { register } = require("module");
const { registerUser, loginUser, currentUser, deleteUser, updateUserInfo } = require("../controllers/userController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/update", updateUserInfo);

router.get("/current", validateToken,currentUser);

router.delete("/delete", validateToken, deleteUser);



module.exports = router;
