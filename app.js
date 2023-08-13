// Including Express Package
const express = require("express");
const app = express();

app.use(express.static('public'));

// // Including Morgan Package
const morgan = require("morgan")
app.use(morgan("dev"))

// // Including Cors Package
const cors = require("cors")
app.use(cors())

// Setting up the bodyParser
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connection to MongoDB
require("./connection/mongoose")

// Routes
const cuisineRouter = require("./routes/Cuisine")
const User = require("./routes/User")

// Injections
app.use('/api/v1/cuisines', cuisineRouter)
app.use("/api/v1/users", User);

// The NodeJS App is running on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export app
module.exports = app;
