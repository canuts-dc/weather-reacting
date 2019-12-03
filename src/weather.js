import React, { useState } from "react";
import "./weather.css";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      max: response.data.main.temp_max,
      min: response.data.main.temp_min,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      percipitation: 14,
      city: response.data.name,
      description: response.data.weather[0].description
      //icon: "wi wi- day - sunny display - 1",
    });
  }

  function search(event) {
    const apiKey = "8cce113d0fdd08b0728bb9de122a7c47";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handlSubmit(event) {
    event.preventDefaul();
    search(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="container-md col-4 rounded-lg shadow-lg">
        <form onSubmit={handlSubmit}>
          <div className="row">
            <div className="col-7 mt-25px">
              <input
                type="search"
                placeholder="Enter city..."
                className="form-control"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-1">
              <input
                type="submit"
                value="Search"
                className="btn btn-outline-secondary"
              />
            </div>
          </div>
        </form>
        <WeatherInfo info={weatherData} />
      </div>
    );
  } else {
    search();
    return "Fetching...";
  }
}
