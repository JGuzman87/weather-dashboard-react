"use client"
import React from 'react'

import { useState} from "react";

interface WeatherData {
  name: string; // City name
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };

  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
}

interface Forecast {
  list: {
    dt: number;
    dt_txt: string; // Date and time of the forecast
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };

    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
  }[];
}



const Dashboard = () => {
   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<Forecast | null>(null);
  const [city, setCity] = useState('');
  

  
  const apiKey: string = 'e1289235d4638591919c1af0c4190754';




      const fetchData = async () => {
        const weatherUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;
        const forecastUrl: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;
        try {
          //fetch weather
          const response = await fetch(weatherUrl);
          const data = await response.json();
          setWeatherData(data);
          console.log("Fetched Data:", data);
          //fetch forecast
          const forecastResponse = await fetch(forecastUrl);
          const data2 = await forecastResponse.json();
          setForecastData(data2);
          console.log("Fetched forecast:",data2);

        } catch (error) {
          console.error("Could not fetch data", error);
        }
        

      };


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setCity(value)
  }

 




  return (
    <div className="container">
      <div className="search-weather ">
        <form
          className="flex flex-col justify-between gap-4  bg-blue-800 p-2  text-center shadow-2xl rounded-md "
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
        >
          <label htmlFor="city-search" id="city-search">
            Search for a City:
          </label>
          <input
            className="bg-white"
            value={city}
            type="text"
            placeholder="city name here..."
            onChange={handleChange}
          />

          <button className="btn btn-primary" onClick={fetchData} type="submit">
            Submit
          </button>
        </form>
        <div
          className="weather-container"
          style={
            weatherData
              ? {
                  backgroundColor: "rgb(37, 97, 188)",
                  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }
              : undefined
          }
        >
          <h1 className="text-xl font-bold">
            {weatherData?.main?.temp
              ? `Current weather in ${weatherData.name}:`
              : ""}
          </h1>
          <p className="item">
            {weatherData ? `Temp: ${weatherData?.main.temp}°F` : ""}
            {weatherData ? (
              <img
                src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`}
                alt={weatherData?.weather[0]?.description}
                style={{
                  width: "60px",
                  margin: "0 auto",
                }}
              />
            ) : (
              ""
            )}
          </p>
          <p className="item">
            {weatherData ? `Humidity: ${weatherData?.main.humidity}%` : ""}
          </p>
          <p className="item">
            {weatherData ? `Wind: ${weatherData?.wind.speed} m/s` : ""}
          </p>
        </div>
      </div>

      <h1 className="flex self-center text-xl font-semibold">
        {weatherData ? "5-Day Forecast:" : ""}
      </h1>
      <div className="forecast">
        {forecastData?.list
          .filter((item) => item.dt_txt.includes("15:00:00"))
          .slice(0, 5)
          .map((item, index) => {
            const dateTime = new Date(item.dt * 1000);
            return (
              <div
                key={index}
                style={{
                  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }}
                className={`${
                  forecastData ? "bg-blue-500" : undefined
                }  min-h-40 text-center`}
              >
                <p className="item">{`Date: ${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</p>
                <p className="item">{`Temp: ${item.main.temp} °F `}</p>
                {item ? (
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0]?.icon}.png`}
                    alt={item.weather[0]?.description}
                    style={{
                      width: "60px",
                      margin: "0 auto",
                    }}
                  />
                ) : (
                  ""
                )}

                <p className="item">{`Humidity: ${item.main.humidity}%`}</p>
                <p className="item">{`Wind: ${item.wind.speed} m/s`}</p>
              </div>
            );
          })}
      </div>
    </div>
  );}

export default Dashboard