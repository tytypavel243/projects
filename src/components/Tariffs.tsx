import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TariffsProps {
  onNavigate: (screen: string) => void;
}

const Tariffs: React.FC<TariffsProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedPrices, setAnimatedPrices] = useState<{ [key: string]: number }>({});

const backgrounds = [
  'from-amber-700 via-yellow-900 to-amber-700',          // Bronze
  'from-yellow-600 via-amber-500 to-yellow-600',           // Metallic Gold
  'from-blue-300 via-blue-200 to-blue-300',                // Diamonds
];

  const tariffs = [
    {
      name: 'Bronze',
      price: 10000,
      description: 'Стандартный входной билет',
      features: ['Вход на вечеринку + базовый welcome-коктейль', 'Доступ к основному залу с диджей-сетом и живым вокалом', 'Стандартный бар: 3 вида алкоголя + безалкогольные напитки', 'Маска для анонимности + атмосфера без гаджетов'],
      textColor: 'from-amber-400 to-amber-600',
      gradient: 'from-amber-700 via-yellow-900 to-amber-700',
    },
    {
      name: 'Gold',
      price: 25000,
      description: 'VIP-доступ',
      features: ['Всё из Бронзы + приватная зона с кальяном', 'Персональный хостес', 'Расширенный бар', 'Доступ в зону с зеркальным танцполом и лаунж-диванами', 'Право на 1 бесплатный тост от бармена'],
    textColor: 'from-yellow-500 to-yellow-400', // можно скорректировать, если требуется
    gradient: 'from-yellow-500 via-yellow-400 to-yellow-500',
    },
    {
      name: 'Diamonds',
      price: 50000,
      description: 'Премиум-доступ',
      features: ['Всё из Серебра + VIP-комната с звукоизоляцией', 'Личный фотограф', 'Эксклюзив: коллекционный виски, вино + золотой кальян', 'Трансфер бизнес-класса до/из клуба', 'Сувенир: маска с кристаллами Swarovski + приглашение на закрытую after-party'],
    textColor: 'from-blue-300 to-blue-200', // аналогично можно настроить
    gradient: 'from-blue-300 via-blue-200 to-blue-300',
    },
  ];

  useEffect(() => {
    const targetPrice = tariffs[currentSlide].price;
    let startPrice = 0;
    const duration = 1000;
    const steps = 60;
    const increment = targetPrice / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        startPrice += increment;
        setAnimatedPrices(prev => ({
          ...prev,
          [currentSlide]: Math.round(startPrice)
        }));
        currentStep++;
      } else {
        clearInterval(interval);
        setAnimatedPrices(prev => ({
          ...prev,
          [currentSlide]: targetPrice
        }));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    beforeChange: (_, next) => setCurrentSlide(next),
    className: 'h-full',
    arrows: false
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className={`min-h-screen bg-gradient-to-br ${backgrounds[currentSlide]} transition-all duration-1000 flex flex-col`}
>
      <div className="flex flex-col px-4 pt-4 pb-6 h-full">
        <div className="flex-1">
          <Slider {...settings}>
            {tariffs.map((tariff, index) => (
              <div key={index} className="h-[calc(100vh-7rem)]">
<motion.div
  className={`relative h-full rounded-3xl overflow-hidden bg-gradient-to-r ${tariff.gradient}`}
  animate={{
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    repeatType: 'reverse'
  }}
>
                  <div className="absolute inset-[2px] bg-black/80 rounded-3xl p-8 h-full flex flex-col">
                    <AnimatePresence mode="wait">
<motion.h2
  key={tariff.name} // ключ теперь не зависит от currentSlide
  variants={titleVariants}
  initial="hidden"
  animate={{
    ...titleVariants.visible,
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
  }}
  // Не задаём exit, чтобы не проигрывалась анимация скрытия
  className={`text-3xl font-bold text-center bg-gradient-to-r ${tariff.textColor} bg-clip-text text-transparent`}
  style={{ backgroundSize: '200% 200%' }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'linear'
  }}
>
  {tariff.name}
</motion.h2>

                    </AnimatePresence>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-4xl font-bold text-center my-6"
                    >
                      {new Intl.NumberFormat('ru-RU').format(animatedPrices[index] || 0)} ₽
                    </motion.div>

                    <p className="text-xl text-center mb-6">{tariff.description}</p>
                    <ul className="space-y-3 mb-8 flex-1 overflow-y-auto">
                      {tariff.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="mr-2">✨</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-auto"
                      onClick={() => window.open('https://t.me/code_eengineer010')}
                    >
                      Связаться с менеджером
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
            onClick={() => onNavigate('about')}
          >
            О вечеринке
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black/20 rounded-full"
            onClick={() => onNavigate('welcome')}
          >
            Назад
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Tariffs;