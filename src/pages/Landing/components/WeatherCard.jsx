import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material"; // Import CircularProgress
import axios from "axios";

const WeatherCard = ({ forecast }) => {
  return (
    <Card
    style={{
      width: "300px",
      textAlign: "center",
      margin: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "15px",
      backgroundColor: "#D1EBF4",
    }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            style={{ width: "50px", height: "50px", margin: "auto" }}
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt={forecast.weather[0].main}
          />
        </div>
        <div style={{ flex: 2 }}>
          <Typography variant="h6">
            {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography variant="body1">{forecast.weather[0].main}</Typography>
          <Typography variant="body2">{`Min: ${forecast.temp.min} °C, Max: ${forecast.temp.max} °C`}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const WeeklyWeather = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // State variable for loading status

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${
            location?.Latitude ? location?.Latitude : "7.2345496"
          }&lon=${
            location?.Longitude ? location?.Longitude : "80.5110764"
          }&exclude=alerts&appid=0694be38c9699754d51b795122855d1a&units=metric`
        );
        const data = await response.json();
        setWeatherData(data.daily);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {loading && (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}{" "}
      {/* Show spinner while loading */}
      {weatherData &&
        weatherData
          .slice(0, 4)
          .map((forecast, index) => (
            <WeatherCard key={index} forecast={forecast} />
          ))}
    </div>
  );
};

export default WeeklyWeather;
