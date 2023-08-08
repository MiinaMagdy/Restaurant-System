const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', true);
(async() => {
  try {
     await mongoose.connect("mongodb://localhost:27017");
     console.log("Connected with mongoDB")
  } catch (err) {
    console.error(err.message);
  }
})()