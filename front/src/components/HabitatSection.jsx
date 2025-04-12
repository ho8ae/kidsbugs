import React from 'react';
import { motion } from 'framer-motion';

const HabitatSection = () => {
  const features = [
    '천연 원목으로 제작된 친환경 곤충 하우스',
    '성장 단계별 맞춤형 먹이 세트',
    '온도와 습도 조절이 가능한 고급 사육 세트',
    '곤충의 행동을 관찰할 수 있는 투명 관찰창'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              완벽한 <span className="text-green-600">곤충 놀이터</span>로<br />
              특별한 경험을 선사하세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              곤충들이 자연 서식지와 유사한 환경에서 건강하게 자랄 수 있도록 특별히 제작된 프리미엄 사육 용품을 만나보세요. 아이들에게 곤충의 생태를 가까이서 관찰할 수 있는 특별한 기회를 제공합니다.
            </p>
            
            <ul className="space-y-4 mb-8">
              {features.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <motion.button 
              className="px-8 py-3 bg-green-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              사육용품 구경하기
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 bg-black rounded-xl overflow-hidden h-96"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* 여기에 곤충 놀이터/사육장 이미지가 들어갈 예정 */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HabitatSection;