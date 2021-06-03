var express = require('express');
var app = express();
const pug = require('pug');
const fs=require('fs');
const port=80;
const bodyparser=require('body-parser')

// moongoose relates stuff

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactPage', {useNewUrlParser: true, useUnifiedTopology: true});

//defining Schema and pushing to a model
const Contactinfo = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    dob: String,
    phone: String,
    address: String
  });

const Contact= mongoose.model('Contact', Contactinfo);
// Express related commands
app.use('/static', express.static('static'))
app.use(express.urlencoded());

// Pug realted commands
app.set('view engine', 'pug')
app.set('views','./views')

//Endpoints
app.get('/', (req, res)=>{
   const parameters = {}
   res.render('home.pug',parameters);
})
app.get('/contact', (req, res)=>{
    const parameters = {}
    res.render('contact.pug',parameters);
 })
 // Important for saving to the database
 app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.send("This data has been saved to database")
    }).catch(()=>{
        res.status(404).send("Error")
    })

   // res.render('contact.pug');
 })

// feeding to server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});