import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebApp } from '@twa-dev/sdk';
import WelcomeScreen from './components/WelcomeScreen';
import AboutParty from './components/AboutParty';
import Tariffs from './components/Tariffs';

// Основной компонент приложения
function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  // Функция для навигации между экранами
  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onNavigate={navigateTo} />
        )}
        {currentScreen === 'about' && (
          <AboutParty key="about" onNavigate={navigateTo} />
        )}
        {currentScreen === 'tariffs' && (
          <Tariffs key="tariffs" onNavigate={navigateTo} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;