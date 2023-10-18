const express = require("express");
const { connect } = require("./config/database");
const authRoutes = require("./routes/Auth") 
const userRoutes = require("./routes/user") 
const bookRoutes = require("./routes/book") 
const cartRoutes =  require("./routes/cart")
const reviewRoutes = require("./routes/reviewAndRating")
const app = express();
var cors = require('cors')

const PORT = process.env.PORT || 5000 
require("dotenv").config()
app.use(express.json());
app.use(cors())

// function to connect the DB
connect();

// Routes
app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/users" , userRoutes)
app.use("/api/v1/book" , bookRoutes)
app.use("/api/v1/cart" , cartRoutes)
app.use("/api/v1/review" , reviewRoutes)

app.get("/" , (req , res) => {
    res.send("App is running")
})

app.listen(PORT , () => {
    console.log(`App is running on PORT : ${PORT}`)
})
