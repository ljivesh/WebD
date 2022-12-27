const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs');


var listItems = [];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req,res) => {
    
    const currentTime = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    // const todayDate = `${currentTime.getDate()}/${currentTime.getMonth()+1}/${currentTime.getFullYear()}`;
    const ejsData = {
        today: currentTime.toLocaleDateString('en-us', options),
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