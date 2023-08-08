const express = require('express')
const app = express()
const port = 3000

// Connection to MongoDB
require("./connection/mongoose")

app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
})

// Routes
const cuisineRouter = require("./routes/Cuisine")
// Injections
app.use('/api/v1', cuisineRouter)

// Exporting the app
module.exports = app;
