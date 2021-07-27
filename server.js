/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const PORT = 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connecting to db
//const mongourl = "mongodb+srv://igotapps650:conDom77@cluster0.ko1ty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
try {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}

// importing routes
const postRoute = require("./routes/posts");
app.use("/post", postRoute);

//MIDDLEWARE

//ROUTES
app.get("/", (req, res) => {
  res.send("welcome to your mern starter app");
});

app.get("/post", (req, res) => {
  res.send("we are on the post page");
});

// How to start listening to the sever
app.listen(PORT, () => {
  console.log("sever is running on port: " + PORT);
});
