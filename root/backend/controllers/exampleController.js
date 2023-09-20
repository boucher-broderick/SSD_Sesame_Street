const Example = require('../models/exampleModel');
const asyncHandler = require("express-async-handler");


//@desc Get all examples
//@route GET /api/example
//@access Public
const getExamples = asyncHandler(async (req, res) => {
    const example = await Example.find();
    res.status(200).json(example)
  });

//@desc Get example by id
//@route GET /api/example/:id
//@access Public
const getExample = (req, res) => {
    res.status(200).json({message: `get example for ${req.params.id}`})
};

//@desc Create new example
//@route POST /api/example
//@access Public

const createExample = asyncHandler(async (req, res) => {
console.log("The request body is :", req.body);
const { name, age } = req.body;
if (!name || !age ) {
    res.status(400);
    throw new Error("All fields are mandatory !");
}
const example = await Example.create({
    name,
    age
});

res.status(201).json(example);
});


//@desc Update new example
//@route PUT /api/example/:id
//@access Public
const updateExample = (req, res) => {
    res.status(200).json({message: `update example for ${req.params.id}`})
};

//@desc Delete new example
//@route DELETE /api/example/:id
//@access Public
const deleteExample = (req, res) => {
    res.status(200).json({message: `delete example for ${req.params.id}`})
};

module.exports = {getExamples, createExample, getExample, updateExample, deleteExample};