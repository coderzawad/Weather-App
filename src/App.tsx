import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { Welcome } from './components/Welcome';
import type { WeatherData } from './types';
import { CloudSun, MapPin } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geolocating, setGeolocating] = useState(true);

  const API_KEY = 'c4c07cd59785cf2952165dd5b45d2555';

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          setGeolocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setGeolocating(false);
        }
      );
    } else {
      setGeolocating(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <CloudSun className="w-10 h-10 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Weather App</h1>
      </motion.div>

      <SearchBar onSearch={fetchWeatherByCity} />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {geolocating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 text-gray-600"
        >
          <MapPin className="w-5 h-5 animate-pulse" />
          <span>Detecting your location...</span>
        </motion.div>
      )}

      {(weatherData || loading) && (
        <WeatherCard data={weatherData!} loading={loading} />
      )}

      {!weatherData && !loading && !error && !geolocating && (
        <Welcome />
      )}
    </div>
  );
}

export default App;
