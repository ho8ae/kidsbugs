// src/components/HeroSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  // 요소 참조
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // 타임라인 생성
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // 초기 애니메이션 시퀀스
    tl.fromTo(overlayRef.current, 
      { opacity: 0 }, 
      { opacity: 0.5, duration: 1 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.3"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7 },
      "-=0.4"
    )
    .fromTo(buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.2"
    );
    
    // 스크롤에 따른 페이드아웃 효과
    gsap.to([overlayRef.current, titleRef.current, subtitleRef.current, buttonsRef.current], {
      opacity: 0,
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "30% top",
        scrub: true
      }
    });
    
    // 스크롤 표시기 애니메이션
    const scrollAnimation = gsap.timeline({ repeat: -1 });
    
    scrollAnimation.to(scrollIndicatorRef.current.querySelector('.scroll-dot'), {
      y: 10,
      duration: 0.8,
      ease: "power1.inOut"
    })
    .to(scrollIndicatorRef.current.querySelector('.scroll-dot'), {
      y: 0,
      duration: 0.8,
      ease: "power1.inOut"
    });
    
    // 클린업 함수
    return () => {
      tl.kill();
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // 버튼 호버 효과
  const handleButtonHover = (button, isEntering) => {
    gsap.to(button, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.2
    });
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-green-100"
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-50"
      />
      
      {/* 사슴벌레 히어로 이미지 배경 */}
      <div className="absolute inset-0 bg-black">
        {/* 실제 이미지로 교체 예정 */}
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
        >
          자연과 함께 자라는 <br />
          <span className="text-yellow-400">우리 아이의 특별한 친구</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
        >
          키즈벅스와 함께 신비로운 곤충의 세계로 초대합니다
        </p>
        
        <div ref={buttonsRef}>
          <button 
            className="px-8 py-3 bg-yellow-400 text-yellow-900 rounded-full text-lg font-semibold shadow-lg mr-4 hover:bg-yellow-300 transition-colors"
            onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
          >
            상품 보기
          </button>
          
          <button 
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-green-700 transition-all"
            onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
          >
            사육 가이드
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 w-full text-center"
      >
        <div className="w-8 h-14 mx-auto border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="scroll-dot w-1 h-3 bg-white rounded-full" />
        </div>
        <p className="text-white mt-2 text-sm">스크롤하여 더 알아보기</p>
      </div>
    </section>
  );
};

export default HeroSection;