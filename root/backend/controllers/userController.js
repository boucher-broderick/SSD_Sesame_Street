const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async(req, res) =>{
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({error: "All fields are mandatory!"});
    }

    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        return res.status(400).json({error: "User already registered."});
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword );
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log('User created: ', user);
    if (user) {
        return res.status(201).json({ _id: user.id, email: user.email});
    } else {
        return res.status(400).json({error: "User data is not valid"});
    }
});
//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({error: "All fields are mandatory"});
    }
    const user = await User.findOne({ email });
    // Compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        //Provide access token
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
        );
        res.status(200).json({accessToken})
    }
    else{
        res.status(401).json({error: "Email or password is not valid."});
    }
});
//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = expressAsyncHandler(async(req, res) =>{
    res.json({message: "Current user"});
});


module.exports = {registerUser, loginUser, currentUser};