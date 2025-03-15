"use client"
import { useState, useEffect } from 'react';

interface WeatherData {
  city: {
    name: string;
  };
  list: {
    main: {
      temp: number;
    };
  }[];
}


export default function Home() {


  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Miami')
  

  
  const apiKey: string = 'e1289235d4638591919c1af0c4190754';


      const fetchData = async () => {
          const weatherUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;
        try {
          const response = await fetch(weatherUrl);
          const data = await response.json();
          setWeatherData(data);
          console.log("Fetched Data:", data);
        } catch (error) {
          console.error("Could not fetch data", error);
        }
       
      };


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setCity(value)
  }

  return (
    <div>

      <label htmlFor='city-search' id='city-search'>Tipe Search: </label>
      <input value={city} type='text'onChange={handleChange} placeholder='city name here...'/>
      <button className="btn btn-primary" onClick={fetchData} type="submit">Submit</button>
      <h1>
        {weatherData?.list?.[0]?.main?.temp
          ? `Temperature in ${weatherData.city.name}: ${weatherData.list[0].main.temp}°F`
          : "Fetching weather data..."}
      </h1>
    </div>
  );
}
