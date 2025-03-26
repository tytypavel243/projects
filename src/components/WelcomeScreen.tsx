import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const fullText = 'Полная конфиденциальность, интимная атмосфера и роскошь в центре Москвы. Только для избранных — места исчезают, как тайна. Бронируй, пока никто не узнал...';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center min-h-screen p-6 space-y-8 overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
        style={{ filter: 'brightness(0.6)' }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <motion.div
        className="relative text-2xl md:text-4xl text-center font-bold z-10"
        animate={{
          textShadow: ['0 0 10px #fff', '0 0 20px #fff', '0 0 10px #fff'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.div>

      <div className="relative flex flex-col md:flex-row gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-bold shadow-lg"
          onClick={() => onNavigate('tariffs')}
        >
          Забронировать
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-lg font-bold shadow-lg"
          onClick={() => onNavigate('about')}
        >
          О вечеринке
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;