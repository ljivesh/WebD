const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});
app.post("/", (req, res) => {
    var a = Number(req.body.w);
    var b = Number(req.body.h);
    res.send("<h1>Thank You for your input, your BMI is: </h1>"+String(100*100*a/(b*b)));
});

app.listen(3000, ()=> { 
    console.log("Server Started at 3000") 
});