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
        return res.status(201).json({status:400, error: "All fields are mandatory!"});
    }

    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        return res.status(201).json({ status:400, error: "User already registered."});
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
        return res.status(201).json({ status:201, _id: user.id, email: user.email});
    } else {
        return res.status(201).json({ status:400, error: "User data is not valid"});
    }
});


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(200).json({status:400, error: "All fields are mandatory"});
    }
    const user = await User.findOne({ email });
    // Compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        //Provide access tokens
        // const accessToken = jwt.sign({
        //     user:{
        //         username: user.username,
        //         email: user.email,
        //         id: user.id,
        //     },
        // }, 
        // //process.env.ACCESS_TOKEN_SECRET,
        // {expiresIn: "1m"}
        // );
        //res.status(200).json({accessToken})
        res.status(200).json({ status:200, _id: user.id, email: user.email});
    }
    else{
        res.status(200).json({status: 400, error: "Email or password is not valid."});
    }
});
//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = expressAsyncHandler(async(req, res) =>{
    res.json({message: "Current user"});
});

//@desc Delete user account
//@route DELETE /api/users/delete
//@access private
const deleteUser = expressAsyncHandler(async(req, res) =>{
    const userId = req.user.id;  // You'll get this from the validateToken middleware.

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({error: "User not found"});
    }

    await user.remove();

    res.status(200).json({message: "User deleted successfully"});
});

//@desc Login user
//@route POST /api/users/login
//@access public
const updateUserInfo = expressAsyncHandler(async(req, res) => {
    const { id, type, change } = req.body;
    if (!id || !type || !change) {
        return res.status(200).json({ status: 400,  error: "All fields are mandatory" });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(200).json({status: 400,   error: "User not found" });
    }

    // Update the field based on the type
    if (type === 'username') {
        user.username = change;
    } else if (type === 'email') {
        user.email = change;
    } else if (type === 'password') {
        user.password = await bcrypt.hash(change, 10); // Updated password hashing
    } else {
        return res.status(200).json({status: 400,  error: "Invalid update type" });
    }

    await user.save();
    res.status(200).json({ status: 200, message: "User updated successfully" });
});

module.exports = {registerUser, loginUser, currentUser, deleteUser, updateUserInfo};