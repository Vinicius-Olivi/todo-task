require("dotenv").config();

const express = require("express");
const itemRoutes = require("./routes/items");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // parse incomming data
// routes for requests will always now have '/todos'
// eg http://localhost:4000/todos/items
app.use("/todos", itemRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })

  .catch((err) => {
    console.log(err);
  });
// LISTEN ON PORT 4000
// frontend is running on port 3000
