import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Header = () => {
  const headerControls = useAnimation();
  
  // 헤더 스크롤 효과
  useEffect(() => {
    const updateHeader = () => {
      if (window.scrollY > 50) {
        headerControls.start({ backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' });
      } else {
        headerControls.start({ backgroundColor: 'transparent', boxShadow: 'none' });
      }
    };
    
    window.addEventListener('scroll', updateHeader);
    return () => window.removeEventListener('scroll', updateHeader);
  }, [headerControls]);

  return (
    <motion.header 
      className="fixed w-full z-50 py-4 transition-all"
      initial={{ backgroundColor: 'transparent' }}
      animate={headerControls}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl font-bold text-green-600">KidsBugs</span>
          <span className="ml-2 text-sm bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full">애완곤충 전문점</span>
        </motion.div>
        
        <nav className="hidden md:flex space-x-8">
          {['상품', '사육방법', '체험학습', '문의하기'].map((item, index) => (
            <motion.a 
              key={index}
              href={`#${item}`}
              className="font-medium hover:text-green-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        
        <motion.button 
          className="block md:hidden text-2xl"
          whileTap={{ scale: 0.9 }}
        >
          ☰
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;