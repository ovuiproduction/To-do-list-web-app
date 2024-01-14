const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 5000;
const app = express();

app.set('view engine','ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/todo");
const Tasks = require('./model/list');


app.get('/',async (req,res)=>{
    const taskListDB = await Tasks.find().lean()
    res.render("index",{taskList:taskListDB});
});


app.post('/add',async (req,res)=>{
    try{
        let task = req.body.task;
        let listele = new Tasks();
        listele.task = task;
        await listele.save();
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.redirect('/')
    }
});

app.post('/delete/:id',async (req,res)=>{
    try{
        const completedTask = await Tasks.findByIdAndDelete(req.params.id);
        console.log("delete successfully");
        res.redirect('/')
    }catch(err){
        console.log(err);
        res.redirect('/')
    }
});

app.listen(port,(req,res)=>{
    console.log(`server live on port ${port}`);
})