import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface AboutPartyProps {
  onNavigate: (screen: string) => void;
}

const AboutParty: React.FC<AboutPartyProps> = ({ onNavigate }) => {
  const slides = [
    {
      title: 'О вечеринке',
      content: `✨Интимная вечеринка в Москве для тех, кто ценит анонимность. 
      ✨Роскошный клуб в центре, всего 15 мест. 
      ✨Без имён, без гаджетов — только маски, приватные развлечения и живая музыка. 
      ✨Бронируй через организатора, пока места не закончились. Тайна останется с нами

      Как добраться:`,
      showMap: true
    },
    {
      title: 'Что вас ждет',
      content: `— Приватные комнаты.
— Ролевые игры на любой вкус.
— Элитный алкоголь: виски, авторские коктейли, шампанское.
— Кальяны с эксклюзивными ароматами.
— Бар от шефа всё включено.
— Личный хостес.
— Музыка: deep house + живой вокал.
— Охрана: безопасность превыше всего.

P.S. Только добровольно. Без обязательств.`,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: 'h-full',
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
      className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 flex flex-col"
    >
      <div className="h-screen flex flex-col px-4 pt-4 pb-6">
        <div className="flex-1">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="h-[calc(90vh-7rem)]">
                <motion.div
                  className="relative h-full rounded-3xl overflow-hidden"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #ff0080, #7928ca)',
                      'linear-gradient(45deg, #7928ca, #ff0080)',
                      'linear-gradient(45deg, #ff0080, #7928ca)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <div className="absolute inset-[2px] bg-black/80 rounded-3xl p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={slide.title}
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                      >
                        {slide.title}
                      </motion.h2>
                    </AnimatePresence>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-xl mb-6" style={{ whiteSpace: 'pre-line' }}>
                        {slide.content}
                      </p>
                      
                      {slide.showMap && (
                        <div className="h-64 bg-gray-800 rounded-lg relative mt-4">
                          <iframe
                            title="Место проведения"
                            src="https://yandex.ru/map-widget/v1/?ll=37.538031%2C55.751830&z=13.34"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              onClick={() => onNavigate('tariffs')}
            >
              Забронировать
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/20 rounded-full"
              onClick={() => onNavigate('welcome')}
            >
              Назад
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-full max-w-72 mx-auto"
            onClick={() => window.open('https://t.me/code_eengineer010')}
          >
            Связаться с менеджером
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutParty;