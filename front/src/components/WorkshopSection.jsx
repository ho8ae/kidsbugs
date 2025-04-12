import React from 'react';
import { motion } from 'framer-motion';

const WorkshopSection = () => {
  const workshops = [
    {
      title: '곤충 생태 교실',
      description: '전문 곤충학자와 함께 다양한 곤충의 생태와 특성에 대해 배우는 교육 프로그램입니다. 현미경 관찰 및 실습을 통해 곤충의 신비로운 세계를 탐험해보세요.',
      schedule: '토요일, 일요일',
      ageGroup: '5-10세',
      image: 'bg-black' // 체험학습 이미지
    },
    {
      title: '곤충 사육 체험',
      description: '직접 애완곤충을 돌보고 관리하는 방법을 배우는 체험 프로그램입니다. 사육장 꾸미기부터 먹이주기까지, 곤충과 함께하는 특별한 시간을 경험해보세요.',
      schedule: '수요일, 금요일',
      ageGroup: '7-13세',
      image: 'bg-black' // 체험학습 이미지
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium mb-4">곧 시작됩니다</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">체험학습</span>으로 배우는 <br />
            자연의 신비
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            곤충과 함께하는 특별한 교육 프로그램으로 아이들의 호기심을 자극하세요
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-64 ${workshop.image}`}>
                {/* 여기에 체험학습 이미지가 들어갈 예정 */}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3">{workshop.title}</h3>
                <p className="text-gray-600 mb-5">{workshop.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">🗓️ {workshop.schedule}</span>
                  <span>👥 {workshop.ageGroup}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.button 
            className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-600 rounded-full text-lg font-semibold hover:bg-green-500 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            체험학습 알림 신청하기
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkshopSection;