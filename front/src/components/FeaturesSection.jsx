// src/components/FeaturesSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

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

  // 요소 참조
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featureCardsRef = useRef([]);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // 제목 애니메이션
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // 특징 카드 애니메이션
    const cards = featureCardsRef.current.filter(card => card !== null);
    
    cards.forEach((card, index) => {
      if (!card) return; // null 체크 추가
      
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // 카드 호버 효과를 함수로 정의
      const handleMouseEnter = () => {
        gsap.to(card, { y: -5, duration: 0.2, ease: "power1.out" });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, { y: 0, duration: 0.2, ease: "power1.out" });
      };
      
      // 이벤트 리스너 추가
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      // 클린업 함수에서 사용하기 위해 핸들러를 데이터 속성에 저장
      card._mouseEnterHandler = handleMouseEnter;
      card._mouseLeaveHandler = handleMouseLeave;
    });
    
    // 텍스트 하이라이트 효과
    const specialText = titleRef.current?.querySelector('.highlight');
    if (specialText) {
      gsap.fromTo(specialText,
        { color: '#047857' },
        { 
          color: '#16a34a', 
          duration: 1.5, 
          repeat: -1, 
          yoyo: true,
          ease: "sine.inOut"
        }
      );
    }

    // 클린업 함수
    return () => {
      // ScrollTrigger 정리
      if (gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      
      // 이벤트 리스너 정리
      cards.forEach(card => {
        if (card && card._mouseEnterHandler && card._mouseLeaveHandler) {
          card.removeEventListener('mouseenter', card._mouseEnterHandler);
          card.removeEventListener('mouseleave', card._mouseLeaveHandler);
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            키즈벅스만의 <span className="highlight text-green-600">특별함</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            자연과 함께하는 교육적 경험, 아이들의 호기심과 탐구심을 키워줍니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => featureCardsRef.current[index] = el}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 rounded-full bg-${feature.color}-100 flex items-center justify-center text-3xl mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;