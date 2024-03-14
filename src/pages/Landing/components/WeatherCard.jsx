import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WeatherCard = ({ forecast }) => {
  return (
    <Card style={{ width:"300px", textAlign: 'center', margin: '10px', border: '2px solid #DBDBDB', boxShadow: 'none',borderRadius:"15px" }}>
        <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <img
                    style={{ width: '50px', height: '50px', margin: 'auto' }}
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].main}
                />
            </div>
            <div style={{ flex: 2 }}>
                <Typography variant="h6">
                    {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Typography>
                <Typography variant="body1">{forecast.weather[0].main}</Typography>
                <Typography variant="body2">{`Min: ${forecast.temp.min} °C, Max: ${forecast.temp.max} °C`}</Typography>
            </div>
        </CardContent>
    </Card>
  );
};

const WeeklyWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=6.9270786&lon=79.86124300000006&exclude=alerts&appid=0694be38c9699754d51b795122855d1a&units=metric`);
        const data = await response.json();
        setWeatherData(data.daily);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {weatherData && weatherData.slice(0, 4).map((forecast, index) => (
        <WeatherCard key={index} forecast={forecast} />
    ))}
    </div>
  );
};

export default WeeklyWeather;
