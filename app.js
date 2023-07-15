const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const md5 = require("md5");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1/newsletterDB")
.then(()=>{
    console.log("Database connected.");
})
.catch((err)=>{
    console.log(err);
});

const signupSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Newsletter = new mongoose.model("Newsletter", signupSchema)

let added = false;

app.get("/", (req, res)=>{
    res.render("signup", {isAdded: added});
});

app.post("/", (req, res)=>{

    Newsletter.findOne({email: req.body.email})
    .then((found)=>{
        if (found){
            added = true;
            console.log(found);
            console.log(added);
            res.redirect("/");
        }
        else {
            added = false;
            const signup = Newsletter({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
            signup.save()
            .then(()=>{
                res.render("success");
            })
            .catch((err)=>{
                res.render("failure");
            })
        }
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})


