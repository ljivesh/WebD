const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.post("/", (req, res)=> {
    const apiKey = req.body.api;
    const loc = req.body.loc;
    const system = req.body.system;
    // console.log(apiKey+" "+ loc + " "+ system);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+loc+'&units='+system+'&appid='+apiKey;
    https.get(url, (response)=> {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const iconUrl = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';
            res.write("<h1>The temp in "+weatherData.name+" is : " + weatherData.main.temp + " C</h1>");
            res.write("<h2>Weather: "+weatherData.weather[0].description+ "</h2>");
            res.write("<img src = '"+ iconUrl +"'>");
            res.send();
        });
    });

    // res.sendFile(__dirname+"/index.html");
});

const port = 3000;
app.listen(port, ()=> {
    console.log("Server started at: 3000");
});