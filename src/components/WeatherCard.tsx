import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Sun, Wind } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  data: WeatherData;
  loading: boolean;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className="w-16 h-16 text-yellow-400" />;
    case 'clouds':
      return <Cloud className="w-16 h-16 text-gray-400" />;
    case 'rain':
      return <Droplets className="w-16 h-16 text-blue-400" />;
    default:
      return <Sun className="w-16 h-16 text-yellow-400" />;
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-md"
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute right-6 top-6"
        >
          <WeatherIcon condition={data.weather[0].main} />
        </motion.div>
        <div className="text-white">
          <h2 className="text-3xl font-bold">{data.name}, {data.sys.country}</h2>
          <p className="text-6xl font-bold mt-4">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="text-xl mt-2 capitalize">{data.weather[0].description}</p>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-4 rounded-xl"
          >
            <p className="text-gray-500">Feels Like</p>
            <p className="text-2xl font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-4 rounded-xl"
          >
            <p className="text-gray-500">Humidity</p>
            <p className="text-2xl font-semibold">{data.main.humidity}%</p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-2 bg-gray-50 p-4 rounded-xl"
        >
          <Wind className="w-6 h-6 text-gray-400" />
          <div>
            <p className="text-gray-500">Wind Speed</p>
            <p className="text-2xl font-semibold">{Math.round(data.wind.speed)} m/s</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};