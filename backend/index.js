const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const userRoute = require("./Routes/routes");
const Mongo = process.env.MONGO_URI;

mongoose
  .connect(Mongo)
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch(() => {
    console.log("failed to connect to db");
  });
app.use(bodyparser.json());
app.use("/user", userRoute);
app.listen(PORT, () => {
  console.log("server is listening on 3000");
});
