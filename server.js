/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");
require("dotenv").config({path: "./config.env"});
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connecting to db
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

//set static assets if in production
if (process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
  
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname, 'client','build','index.html'));  
  })

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
