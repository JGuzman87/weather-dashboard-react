"use client"
import { useState} from 'react';

interface WeatherData {
  name: string; // City name
  main: {
    temp: number;
    humidity: number;
  }
  wind: {
    speed: number;
  };
  
}

interface ForecastData {

}

let City: string;


export default function Home() {


  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState()
  const [city, setCity] = useState<typeof City | 'Miami'>('')
  

  
  const apiKey: string = 'e1289235d4638591919c1af0c4190754';


      const fetchData = async () => {
        const weatherUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;
        const forecastUrl: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;
        try {
          const response = await fetch(weatherUrl);
          const data = await response.json();
          setWeatherData(data);
          console.log("Fetched Data:", data);

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
      <div className="search-container shadow-2xl">
        <label htmlFor="city-search" id="city-search">
          Search for a City:
        </label>
        <input
          className="bg-white"
          value={city}
          type="text"
          onChange={handleChange}
          placeholder="city name here..."
        />

        <button className="btn btn-primary" onClick={fetchData} type="submit">
          Submit
        </button>
      </div>

      <div className="weather-container shadow-2xl">
        <h1 className="text-xl font-bold">
          {weatherData?.main?.temp
            ? `Current weather in ${weatherData.name}:`
            : "Fetching weather data..."}
        </h1>
        <p>{`Temp: ${weatherData?.main.temp}°F`}</p>
        <p>{`Humidity: ${weatherData?.main.humidity}%`}</p>
        <p>{`Wind: ${weatherData?.wind.speed} m/s`}</p>
      </div>

      <div className="forecast-container shadow-2xl">
        <h1 className="text-xl font-semibold">5-Day Forecast</h1>
        <p>{`Date:`}</p>
        <p>{`Temp: `}</p>
        <p>{`Humidity`}</p>
        <p>{`Wind`}</p>
      </div>
    </div>
  );
}
