const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs');
const Date = require(__dirname+'/local_modules/date-parser.js');


var listItems = [];
const date = Date();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req,res) => {
    
    // const currentTime = new Date();
    // const options = {
    //     weekday: 'long',
    //     day: 'numeric',
    //     month: 'long'
    // }
    const ejsData = {
        today: date,
        items: listItems
    }
    res.render('list', ejsData);
    
});

app.post('/', (req, res) => {
    const task = req.body.addItem;
    console.log(task);
    listItems.push(task);
    res.redirect('/');
});

const port = 3000;
app.listen(port, ()=> {
    console.log(`Server started at ${port}`);
});