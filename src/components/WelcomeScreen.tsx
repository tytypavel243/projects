import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const fullText =
    'Полная конфиденциальность, интимная атмосфера и роскошь в центре Москвы. Только для избранных — места исчезают, как тайна. Бронируй, пока никто не узнал...';

  useEffect(() => {
    // Ждём 2 секунды перед началом печати
    const delayTimeout = setTimeout(() => {
      setStartTyping(true);
    }, 3500);

    return () => clearTimeout(delayTimeout);
  }, []);

  useEffect(() => {
    if (!startTyping) return;

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
  }, [startTyping]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center min-h-screen p-6 space-y-8 overflow-hidden"
    >
      {/* Видео-фон с плавным появлением */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
        style={{ filter: 'brightness(0.6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </motion.video>

      <motion.div
  className="relative text-2xl md:text-4xl text-center font-bold z-10 text-white"
  initial={{ opacity: 0 }}
  animate={{
    opacity: [0.7, 1, 0.7], // Колеблется между 70% и 100%
    textShadow: ['0 0 10px #fff', '0 0 20px #fff', '0 0 10px #fff'],
  }}
  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 2 }}
>
  {text}
</motion.div>

      {/* Кнопки с плавным появлением */}
      <motion.div
        className="relative flex flex-col md:flex-row gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
