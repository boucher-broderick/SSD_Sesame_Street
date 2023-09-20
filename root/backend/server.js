
const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
const dotenv = require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/example", require("./routes/exampleRoutes"));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});