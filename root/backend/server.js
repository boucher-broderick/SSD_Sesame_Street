
const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/chapters", require("./routes/chapterRoutes"));
app.use("/api/content",  require("./routes/contentRoutes"));
app.use("/api/example", require("./routes/exampleRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});