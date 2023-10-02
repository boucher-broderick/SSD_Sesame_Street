const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async(req, res) =>{
    const{username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered.")
    }

    // Creating hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed pass: ", hashedPassword);
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