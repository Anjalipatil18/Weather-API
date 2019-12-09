const raw_input = require('readline-sync').question;
const cityInput =raw_input("enter the city name...: ")
const fs = require('fs') 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


function weatherApi(courses){
    const axios = require('axios');
    return response = axios.get(courses);
}
var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid=564b520ffae9528ec61ea1c1811d21e7";
response=weatherApi(url);

function getCitydata(data){
    response.then((data)=>{
        var insideData=data["data"];
        var latAndLon=insideData["coord"];
        var lat=latAndLon["lat"]
        var lon=latAndLon["lon"]
        var url1="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=564b520ffae9528ec61ea1c1811d21e7";
        var latAndLonData=weatherApi(url1)
        return latAndLonData
    })
    .then((latAndLonData)=>{
        var weatherDetails={}
        var weatherData=latAndLonData["data"]
        var weather=weatherData["weather"]
        for (var i in weather){
            weatherId=weather[i]["id"]
            weatherName=weather[i]["main"]
            weatherDescription=weather[i]["description"]
        }
        var cityId=weatherData["id"]
        var cityName=weatherData["name"]
        weatherDetails["cityId"]=cityId
        weatherDetails["cityName"]=cityName
        weatherDetails["weather_id"]=weatherId
        weatherDetails["status"]=weatherName
        weatherDetails["discription"]=weatherDescription
        return weatherDetails
    })
    .then((weatherDetails)=>{
        let data = fs.readFileSync('weatherCityDetails.json')
        data = data.toString();
        let Data = JSON.parse(data)
        Data.push(weatherDetails)
        for (index in Data){
            if(Data[index]["cityName"]==cityInput){
                fs.writeFileSync("weatherCityDetails.json", JSON.stringify(Data,null,2))
            }
        }console.log("this data is already taken")
         

    })  
    }
getCitydata(response)