const express = require("express");
const https = require("node:https");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "7459180255faee12a849059541739ecb";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      //console.log(data); output hexadecimal code
      const weatherData = JSON.parse(data); //3d javascript object using Json.parse.
      //const object ={name: "angela",favouriteFood:"Ramen"}
      //JSON.stringify(object); Javascript object to a single string
      const temp = weatherData.main.temp; //search path 2by using Json viewer awesome copy path
      //res.send Only one res.write multiple
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weatherData.weather[0].description;
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in"+query+" is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  });

});





app.listen(3000, function() {
  console.log("Server is running on port 3000")
})
