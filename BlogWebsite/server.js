const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const posts = [];


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');

const ejsContent = {
    homeContent: homeContent,
    contactContent: homeContent,
    aboutContent: homeContent,
    posts: posts
};

app.get('/:locName', (req, res) => {
    res.render(req.params.locName, ejsContent);
});
app.get('/posts/:postTitle', (req, res) => {
    posts.forEach((post) => {
        
        if(_.lowerCase(post.title)===_.lowerCase(req.params.postTitle)) {
            const data = {
                postTitle: post.title,
                postContent: post.content
            };
            res.render('post', data);
        }
    });
});

app.post('/compose', (req, res)=> {
    const composeData = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(composeData);
    // console.log(`${composeData.title}:\n${composeData.content}`);
    res.redirect('/compose');
});

const port = 3000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));