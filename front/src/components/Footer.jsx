import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: '쇼핑하기',
      links: ['사슴벌레', '장수풍뎅이', '왕사마귀', '귀뚜라미', '곤충 먹이', '사육용품']
    },
    {
      title: '정보',
      links: ['사육 가이드', '곤충 사전', '체험학습', 'FAQ', '배송 정책', '교환 및 환불']
    },
    {
      title: '회사 소개',
      links: ['키즈벅스 소개', '연혁', '찾아오시는 길', '채용정보', '제휴 문의']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-2xl font-bold text-white">KidsBugs</span>
              <span className="ml-2 text-sm bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full">애완곤충 전문점</span>
            </motion.div>
            <p className="text-gray-400 mb-6">
              자연과 함께 자라는 아이들의 특별한 친구, 키즈벅스와 함께 신비로운 곤충의 세계를 경험해보세요.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'youtube', 'blog'].map((social, index) => (
                <motion.a 
                  key={index}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <span className="sr-only">{social}</span>
                  {/* 소셜 미디어 아이콘 */}
                </motion.a>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 3 }}
                  >
                    <a href={`#${link}`} className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} 키즈벅스(KidsBugs). 모든 권리 보유.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#terms" className="hover:text-white transition-colors">이용약관</a>
            <a href="#contact" className="hover:text-white transition-colors">고객센터</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;