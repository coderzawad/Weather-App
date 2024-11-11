import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import type { WeatherData } from './types';
import { CloudSun } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = 'c4c07cd59785cf2952165dd5b45d2555'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (city: string) => {
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

      <SearchBar onSearch={fetchWeather} />

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {(weatherData || loading) && (
        <WeatherCard data={weatherData!} loading={loading} />
      )}

      {!weatherData && !loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-12"
        >
          <p className="text-lg">Enter a city name to get started</p>
          <p className="text-sm mt-2">Example: London, Tokyo, New York</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;
