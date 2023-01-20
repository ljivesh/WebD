const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const postSchema = {
    title: String,
    content: String
};
mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");
const Post = mongoose.model('post', postSchema);



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');


app.get('/', (req, res)=> {

    Post.find({}, (err, posts)=> {
        if(err) console.log(err);
        else {
            const homeData = {
                homeContent: homeContent,
                posts: posts
            };
            res.render('home', homeData);
        }
    });
});

app.get('/:locName', (req, res) => {
    
    const locName = req.params.locName;
    
    if(locName === 'about') {
        const aboutData = {
            aboutContent: homeContent
        };
        res.render('about', aboutData);
    }

    else if(locName === 'contact') {
        const contactData = {
            contactContent: homeContent
        };
        res.render('contact', contactData);
    }

    else if(locName === 'compose') {
        res.render('compose');
    }

    else {
        res.redirect('/');
    }
});

// app.get('/posts/:postTitle', (req, res) => {

//     const postTitle = req.params.postTitle;
//     Post.findOne({title: postTitle}, (err, foundPost)=> {
//         if(err) console.log(err)
//         else if(foundPost!==null) {
//             res.render('post', foundPost);
//         }
//         else res.render('postNotFound', {title: postTitle});
//     });
// });

app.post('/compose', (req, res)=> {

    const composeData = {
        title: req.body.title,
        content: req.body.content
    };

    const post = new Post(composeData);
    post.save();
    // posts.push(composeData);
    // console.log(`${composeData.title}:\n${composeData.content}`);
    res.redirect('/');
});

app.post('/post', (req, res)=> {
    const postId = req.body.postId;
    Post.findById(postId, (err, foundPost)=> {
        if(err) console.log(err);
        else {
            // console.log("Reached HEREEEEEE");
            res.render('post', foundPost);
        }
    });
});

const port = 3000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));