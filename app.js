const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("Public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    // <link href="styles.css" rel="stylesheet" />
});

app.post("/", function(req, res){
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email);
});

app.listen(3000, function(){
    console.log("Server is running on 3000 port");
});

// API Key
// 862b8417b4199f8a58615035a33dd5d0-us21