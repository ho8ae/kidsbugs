import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  // 스크롤 애니메이션을 위한 설정
  const { scrollYProgress } = useScroll();
  
  // 스크롤 효과 설정
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-green-100">
      <motion.div 
        className="absolute inset-0 bg-black opacity-50"
        style={{ opacity, scale }}
      />
      {/* 여기에 사슴벌레 히어로 이미지가 들어갈 예정 - 백그라운드 이미지 */}
      <div className="absolute inset-0 bg-black">
        {/* 사슴벌레 히어로 이미지를 배경으로 설정 */}
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          자연과 함께 자라는 <br />
          <span className="text-yellow-400">우리 아이의 특별한 친구</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          키즈벅스와 함께 신비로운 곤충의 세계로 초대합니다
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.button 
            className="px-8 py-3 bg-yellow-400 text-yellow-900 rounded-full text-lg font-semibold shadow-lg mr-4 hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            상품 보기
          </motion.button>
          
          <motion.button 
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-green-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            사육 가이드
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-14 mx-auto border-2 border-white rounded-full flex items-start justify-center p-2"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          <motion.div className="w-1 h-3 bg-white rounded-full" />
        </motion.div>
        <p className="text-white mt-2 text-sm">스크롤하여 더 알아보기</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;