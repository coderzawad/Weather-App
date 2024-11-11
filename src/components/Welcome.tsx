import React from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Compass, Search, Map } from 'lucide-react';

const features = [
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Auto-Location',
    description: 'Automatically detects your location for instant weather updates'
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Global Search',
    description: 'Search weather conditions for any city worldwide'
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: 'Detailed Info',
    description: 'Get comprehensive weather data including temperature, humidity, and wind speed'
  }
];

export const Welcome: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <CloudSun className="w-24 h-24 mx-auto text-blue-500" />
      </motion.div>

      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Your Personal Weather Companion
      </h2>
      
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Get real-time weather updates for your location or search for weather conditions anywhere in the world.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="text-blue-500 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500"
      >
        <p>Try searching for a city above to get started!</p>
      </motion.div>
    </motion.div>
  );
};
