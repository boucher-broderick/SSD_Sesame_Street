const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async(req, res) =>{
    res.json({message: "Register user"});
});
//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async(req, res) =>{
    res.json({message: "Login user"});
});
//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = expressAsyncHandler(async(req, res) =>{
    res.json({message: "Current user"});
});


module.exports = {registerUser, loginUser, currentUser};