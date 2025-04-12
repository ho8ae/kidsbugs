import React from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            곤충 세계의 신비로운 소식을 받아보세요
          </motion.h2>
          
          <motion.p 
            className="text-lg mb-8 opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            특별한 프로모션, 새로운 곤충 소식, 사육 팁을 정기적으로 받아보세요
          </motion.p>
          
          <motion.form 
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <input 
              type="email" 
              placeholder="이메일 주소를 입력하세요" 
              className="px-6 py-3 rounded-full text-gray-800 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <motion.button 
              type="submit" 
              className="px-8 py-3 bg-yellow-400 text-yellow-900 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              구독하기
            </motion.button>
          </motion.form>
          
          <motion.p 
            className="text-sm mt-4 opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            언제든지 구독 취소가 가능하며, 개인정보는 안전하게 보호됩니다
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;