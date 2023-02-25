const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/studentdb').then(()=>{
    console.log("connected to db");
}).catch((e)=>{
    console.log("could not connect", e);
})

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    class:Number,
    mobile: Number
});

const studentmodel = mongoose.model("studentinfo", studentSchema);

app.post("/register", async(req, res)=>{
    console.log("post working");
    const data = new studentmodel({
        name:req.body.name,
        age: req.body.age,
        class:req.body.class,
        mobile: req.body.mobile
    });
    const val = await data.save();
    res.json(val);
})

app.listen(3000, (req, res)=>{
    console.log("server up and running on port 3000");
})

