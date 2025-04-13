// src/components/WorkshopSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WorkshopSection = () => {
  const workshops = [
    {
      title: '곤충 생태 교실',
      description: '전문 곤충학자와 함께 다양한 곤충의 생태와 특성에 대해 배우는 교육 프로그램입니다. 현미경 관찰 및 실습을 통해 곤충의 신비로운 세계를 탐험해보세요.',
      schedule: '토요일, 일요일',
      ageGroup: '5-10세',
      image: 'bg-black', // 체험학습 이미지
      tags: ['교육', '관찰', '체험']
    },
    {
      title: '곤충 사육 체험',
      description: '직접 애완곤충을 돌보고 관리하는 방법을 배우는 체험 프로그램입니다. 사육장 꾸미기부터 먹이주기까지, 곤충과 함께하는 특별한 시간을 경험해보세요.',
      schedule: '수요일, 금요일',
      ageGroup: '7-13세',
      image: 'bg-black', // 체험학습 이미지
      tags: ['사육', '케어', '관리']
    }
  ];

  // 요소 참조
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const workshopCardsRef = useRef([]);
  const buttonRef = useRef(null);
  
  // 이벤트 핸들러 및 애니메이션 참조 저장
  const handlers = useRef({
    cards: [],
    button: null
  });
  
  // 애니메이션 참조 저장
  const animations = useRef([]);
  
  useEffect(() => {
    // 애니메이션 참조를 저장할 배열 초기화
    const anims = [];
    
    // 뱃지 애니메이션
    if (badgeRef.current) {
      const badgeAnim = gsap.fromTo(badgeRef.current,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      anims.push(badgeAnim);
    }
    
    // 제목 애니메이션
    if (titleRef.current) {
      const titleLines = titleRef.current.querySelectorAll('.title-line');
      if (titleLines.length > 0) {
        const titleAnim = gsap.fromTo(titleLines, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
        anims.push(titleAnim);
      }
      
      // 특별한 텍스트 강조 효과
      const highlightText = titleRef.current.querySelector('.highlight');
      if (highlightText) {
        const highlightAnim = gsap.fromTo(highlightText, 
          { color: '#22c55e' },
          { 
            color: '#16a34a', 
            duration: 1.5, 
            repeat: -1, 
            yoyo: true,
            ease: "sine.inOut"
          }
        );
        anims.push(highlightAnim);
      }
    }
    
    // 워크샵 카드 애니메이션
    const cards = workshopCardsRef.current.filter(card => card !== null);
    
    cards.forEach((card, index) => {
      if (!card) return;
      
      // 카드 진입 애니메이션
      const cardAnim = gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      anims.push(cardAnim);
      
      // 호버 핸들러 함수 정의
      const mouseEnterHandler = () => {
        gsap.to(card, { y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", duration: 0.3 });
      };
      
      const mouseLeaveHandler = () => {
        gsap.to(card, { y: 0, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", duration: 0.3 });
      };
      
      // 이벤트 리스너 추가
      card.addEventListener('mouseenter', mouseEnterHandler);
      card.addEventListener('mouseleave', mouseLeaveHandler);
      
      // 핸들러 저장 (클린업에서 사용)
      handlers.current.cards[index] = {
        element: card,
        enter: mouseEnterHandler,
        leave: mouseLeaveHandler
      };
    });
    
    // 버튼 애니메이션
    if (buttonRef.current) {
      const buttonAnim = gsap.fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
      anims.push(buttonAnim);
      
      // 버튼 호버 효과
      const buttonEnterHandler = () => {
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2 });
      };
      
      const buttonLeaveHandler = () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
      };
      
      buttonRef.current.addEventListener('mouseenter', buttonEnterHandler);
      buttonRef.current.addEventListener('mouseleave', buttonLeaveHandler);
      
      // 핸들러 저장
      handlers.current.button = {
        element: buttonRef.current,
        enter: buttonEnterHandler,
        leave: buttonLeaveHandler
      };
    }
    
    // 애니메이션 참조 저장
    animations.current = anims;
    
    // 클린업 함수
    return () => {
      // 애니메이션 정리
      animations.current.forEach(anim => {
        if (anim && anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        if (anim && anim.kill) {
          anim.kill();
        }
      });
      
      // 카드 이벤트 리스너 정리
      handlers.current.cards.forEach(handler => {
        if (handler && handler.element && handler.enter && handler.leave) {
          try {
            handler.element.removeEventListener('mouseenter', handler.enter);
            handler.element.removeEventListener('mouseleave', handler.leave);
          } catch (error) {
            console.warn('이벤트 리스너 제거 중 오류:', error);
          }
        }
      });
      
      // 버튼 이벤트 리스너 정리
      if (handlers.current.button && 
          handlers.current.button.element && 
          handlers.current.button.enter && 
          handlers.current.button.leave) {
        try {
          handlers.current.button.element.removeEventListener('mouseenter', handlers.current.button.enter);
          handlers.current.button.element.removeEventListener('mouseleave', handlers.current.button.leave);
        } catch (error) {
          console.warn('버튼 이벤트 리스너 제거 중 오류:', error);
        }
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span 
            ref={badgeRef}
            className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            곧 시작됩니다
          </span>
          
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <div className="title-line">
                <span className="highlight text-green-600">체험학습</span>으로 배우는
              </div>
              <div className="title-line">
                자연의 신비
              </div>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto title-line">
              곤충과 함께하는 특별한 교육 프로그램으로 아이들의 호기심을 자극하세요
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <div 
              key={index}
              ref={el => workshopCardsRef.current[index] = el}
              className="bg-white rounded-xl overflow-hidden shadow-sm transition-shadow"
            >
              <div className={`h-64 ${workshop.image} workshop-image`}>
                {/* 여기에 체험학습 이미지가 들어갈 예정 */}
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {workshop.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="tag px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="workshop-title text-xl font-semibold mb-3">{workshop.title}</h3>
                <p className="workshop-desc text-gray-600 mb-5">{workshop.description}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">🗓️ {workshop.schedule}</span>
                  <span>👥 {workshop.ageGroup}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            ref={buttonRef}
            className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-600 rounded-full text-lg font-semibold hover:bg-green-500 hover:text-white transition-all"
          >
            체험학습 알림 신청하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;