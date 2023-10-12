const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please input user name"]
    },
    email:{
        type: String,
        required: [true, "Please input email address"],
        unique: [true, "Email address alreaady assocaited with another account"],
    },
    password: {
        type: String,
        required: [true, "Please input password"]
        
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);