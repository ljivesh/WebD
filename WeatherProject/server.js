const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.post("/", (req, res)=> {
    const apiKey = req.body.api;
    const loc = req.body.loc;
    const system = req.body.system;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${system}&appid=${apiKey}`;
    https.get(url, (response)=> {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const iconURL = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            const ejsData = {
                imgURL: iconURL,
                name: weatherData.name,
                temp: weatherData.main.temp,
                desc: weatherData.weather[0].description,
                pressure: weatherData.main.pressure,
                humid: weatherData.main.humidity
            }
            res.render('result', ejsData);

        });
    });

    // res.sendFile(__dirname+"/index.html");
});

const port = 3000;
app.listen(port, ()=> {
    console.log("Server started at: 3000");
});