import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      title: '엄선된 애완곤충',
      description: '국내 최고의 사육 환경에서 건강하게 자란 프리미엄 곤충만을 제공합니다.',
      icon: '🪲',
      color: 'green'
    },
    {
      title: '전문가의 케어 가이드',
      description: '곤충 전문가가 알려주는 맞춤형 사육 가이드로 초보자도 쉽게 시작할 수 있습니다.',
      icon: '📖',
      color: 'blue'
    },
    {
      title: '교육적 가치',
      description: '자연의 신비를 직접 체험하며 아이들의 생명 존중 의식과 책임감을 키워줍니다.',
      icon: '🔍',
      color: 'yellow'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            키즈벅스만의 <span className="text-green-600">특별함</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            자연과 함께하는 교육적 경험, 아이들의 호기심과 탐구심을 키워줍니다
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 rounded-full bg-${feature.color}-100 flex items-center justify-center text-3xl mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;