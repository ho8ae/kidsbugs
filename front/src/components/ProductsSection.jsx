import React from 'react';
import { motion } from 'framer-motion';

const ProductsSection = () => {
  const products = [
    {
      name: '국산 사슴벌레',
      price: '25,000원',
      desc: '초보자도 쉽게 키울 수 있는 인기 품종',
      image: 'bg-black' // 사슴벌레 이미지
    },
    {
      name: '장수풍뎅이',
      price: '22,000원',
      desc: '튼튼한 생명력, 아이들이 가장 좋아하는 곤충',
      image: 'bg-black' // 장수풍뎅이 이미지
    },
    {
      name: '왕사마귀',
      price: '28,000원',
      desc: '우아한 움직임과 독특한 생태를 관찰할 수 있는 곤충',
      image: 'bg-black' // 왕사마귀 이미지
    },
    {
      name: '귀뚜라미',
      price: '15,000원',
      desc: '아름다운 울음소리, 키우기 쉬운 입문자용 곤충',
      image: 'bg-black' // 귀뚜라미 이미지
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            인기 <span className="text-green-600">애완곤충</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            아이들에게 사랑받는 애완곤충을 만나보세요
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-48 ${product.image}`}>
                {/* 여기에 해당 곤충 이미지가 들어갈 예정 */}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3 text-sm">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">{product.price}</span>
                  <motion.button 
                    className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    구매하기
                  </motion.button>
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
            className="px-8 py-3 bg-yellow-400 text-yellow-900 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            모든 상품 보기
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;