const mongoose = require("mongoose");

const  exampleSchema = mongoose.Schema(
{
name: {
    type: String,
    required: [true, "Please enter a name"],
},
age: {
    type: String,
    required: [true, "Please enter a age"],
    }
});

module.exports = mongoose.model("Example", exampleSchema);