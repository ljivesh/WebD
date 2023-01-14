const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs');
const _ = require('lodash');
const Date = require(__dirname+'/local_modules/date-parser.js');
const mongoose = require('mongoose');



// var listItems = [];
const date = Date();
const itemSchema = {
    name: String
}
const listSchema = {
    name: String,
    items: [itemSchema]
}

mongoose.connect("mongodb://127.0.0.1:27017/toDoList");
const List = mongoose.model('list', listSchema);
const Item = mongoose.model('item', itemSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/:listName', (req,res) => {
    
    // const currentTime = new Date();
    // const options = {
    //     weekday: 'long',
    //     day: 'numeric',
    //     month: 'long'
    // }
    const listName = req.params.listName;
    List.findOne({name: listName}, (err, list)=> {
        
        if(err) console.log(err);
        else {
            if(!list) {
                const list = new List({name: listName, items:[]});
                list.save();
                res.redirect(`/${req.params.listName}`);
            }

            else {
                listItems = list.items;
                const ejsData = {
                    title: listName,
                    items: listItems
                }
                res.render('list', ejsData);
                
            }
        } 
    });
});

app.get('/', (req, res)=> {
    Item.find({}, (err, items)=> {
        const ejsData = {
            title: "Today",
            items: items
        }
        res.render('list', ejsData);
    });
});



app.post('/', (req, res) => {
    const itemName = req.body.addItem;
    const listTitle = req.body.list;
    console.log(listTitle);
    // console.log(item);
    const item = new Item({name: itemName});
    if(listTitle==='Today') {
        item.save();
        res.redirect('/');
    } 
    else {
        List.findOne({name: listTitle}, (err, foundList)=> {
            if(err) console.log(err);
            else { 
                foundList.items.push(item);
                foundList.save();
                // console.log(foundList);
                res.redirect(`/${listTitle}`);
            }
        });
    }
});

app.post('/delete', (req, res)=> {
    const itemId = req.body.checkBox;
    const listName = req.body.listName;
    if(listName==='Today') {

        console.log(itemId);
         Item.deleteOne({_id: itemId}, (err)=> {
            if(err) console.log(err);
            else {
                console.log(`Deleted ${itemId} succesfully`);
            }
         });
        res.redirect('/');
    }

    else {
        List.findOneAndUpdate(
            {name: listName},
            {
                $pull: {
                    items: {
                        _id: itemId
                    }
                }
            },
            (err, foundList) => {
                if(err) console.log(err);
                else res.redirect(`/${listName}`);
            }
        );
    }
});

const port = 3000;
app.listen(port, ()=> {
    console.log(`Server started at ${port}`);
});