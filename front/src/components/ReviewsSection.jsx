import React from 'react';
import { motion } from 'framer-motion';

const ReviewsSection = () => {
  const reviews = [
    {
      name: '김민지',
      role: '초등학생 엄마',
      comment: '아이가 사슴벌레에 완전히 매료되었어요. 책임감도 키우고 자연에 대한 관심도 높아졌답니다. 사육 가이드도 정말 상세해서 처음 키우는 저희도 어렵지 않게 잘 키우고 있어요.',
      rating: 5
    },
    {
      name: '이준호',
      role: '초등학교 교사',
      comment: '학급에서 곤충 관찰 프로젝트를 진행했는데, 키즈벅스의 애완곤충과 사육 용품이 큰 도움이 되었습니다. 아이들의 호기심과 탐구심을 자극하기에 최고의 교구였어요.',
      rating: 5
    },
    {
      name: '박서연',
      role: '11살 아들 엄마',
      comment: '처음에는 벌레를 무서워했던 아이가 이제는 곤충 박사가 되었어요. 키즈벅스의 체험학습도 참여했는데, 전문적인 설명과 재미있는 활동으로 아이가 정말 즐거워했답니다.',
      rating: 4
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
            행복한 <span className="text-green-600">고객 후기</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            키즈벅스와 함께한 소중한 경험들을 공유합니다
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <span key={i} className="text-gray-300 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">"{review.comment}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-600 mr-3">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;