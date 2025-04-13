// src/components/NewsletterSection.jsx
import React, { useEffect, useRef } from 'react';

const NewsletterSection = () => {
  // 요소 참조
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const disclaimerRef = useRef(null);
  const bgPatternRef = useRef(null);
  
  // 이벤트 핸들러 저장소
  const handlers = useRef({
    inputFocus: null,
    inputBlur: null,
    buttonEnter: null,
    buttonLeave: null,
    buttonDown: null,
    buttonUp: null
  });
  
  useEffect(() => {
    // 브라우저에서만 실행되는지 확인 (SSR 오류 방지)
    if (typeof window === 'undefined') return;
    
    // GSAP가 로드되었는지 확인
    const gsap = window.gsap;
    if (!gsap) {
      console.warn('GSAP가 로드되지 않았습니다.');
      return;
    }
    
    // ScrollTrigger 플러그인이 등록되어 있는지 확인
    const ScrollTrigger = window.ScrollTrigger;
    if (!ScrollTrigger) {
      console.warn('ScrollTrigger 플러그인이 등록되지 않았습니다.');
      return;
    }
    
    const animations = [];
    
    // 배경 패턴 애니메이션
    if (bgPatternRef.current) {
      try {
        // 스크롤에 따른 배경 패턴 패럴랙스 효과
        const bgAnim = gsap.to(bgPatternRef.current, {
          y: '15%',
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        animations.push(bgAnim);
      } catch (error) {
        console.warn('배경 애니메이션 설정 중 오류:', error);
      }
    }
    
    // 제목 애니메이션
    if (titleRef.current) {
      try {
        const titleAnim = gsap.fromTo(titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          }
        );
        animations.push(titleAnim);
      } catch (error) {
        console.warn('제목 애니메이션 설정 중 오류:', error);
      }
    }
    
    // 설명 텍스트 애니메이션
    if (descriptionRef.current) {
      try {
        const descAnim = gsap.fromTo(descriptionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            delay: 0.1
          }
        );
        animations.push(descAnim);
      } catch (error) {
        console.warn('설명 애니메이션 설정 중 오류:', error);
      }
    }
    
    // 폼 애니메이션
    if (formRef.current) {
      try {
        const formElements = formRef.current.querySelectorAll('input, button');
        
        const formAnim = gsap.fromTo(formElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out"
          }
        );
        animations.push(formAnim);
        
        // 폼 입력 필드 포커스 효과
        const inputField = formRef.current.querySelector('input');
        if (inputField) {
          // 핸들러 함수 정의
          const handleFocus = () => {
            gsap.to(inputField, {
              boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)',
              duration: 0.3
            });
          };
          
          const handleBlur = () => {
            gsap.to(inputField, {
              boxShadow: 'none',
              duration: 0.3
            });
          };
          
          // 이벤트 리스너 등록
          inputField.addEventListener('focus', handleFocus);
          inputField.addEventListener('blur', handleBlur);
          
          // 핸들러 저장 (클린업에서 사용)
          handlers.current.inputFocus = handleFocus;
          handlers.current.inputBlur = handleBlur;
        }
        
        // 버튼 호버 효과
        const button = formRef.current.querySelector('button');
        if (button) {
          // 핸들러 함수 정의
          const handleMouseEnter = () => {
            gsap.to(button, { scale: 1.05, duration: 0.2 });
          };
          
          const handleMouseLeave = () => {
            gsap.to(button, { scale: 1, duration: 0.2 });
          };
          
          const handleMouseDown = () => {
            gsap.to(button, { scale: 0.98, duration: 0.1 });
          };
          
          const handleMouseUp = () => {
            gsap.to(button, { scale: 1.05, duration: 0.1 });
          };
          
          // 이벤트 리스너 등록
          button.addEventListener('mouseenter', handleMouseEnter);
          button.addEventListener('mouseleave', handleMouseLeave);
          button.addEventListener('mousedown', handleMouseDown);
          button.addEventListener('mouseup', handleMouseUp);
          
          // 핸들러 저장 (클린업에서 사용)
          handlers.current.buttonEnter = handleMouseEnter;
          handlers.current.buttonLeave = handleMouseLeave;
          handlers.current.buttonDown = handleMouseDown;
          handlers.current.buttonUp = handleMouseUp;
        }
      } catch (error) {
        console.warn('폼 애니메이션 설정 중 오류:', error);
      }
    }
    
    // 면책 조항 애니메이션
    if (disclaimerRef.current) {
      try {
        const disclaimerAnim = gsap.fromTo(disclaimerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            delay: 0.3
          }
        );
        animations.push(disclaimerAnim);
      } catch (error) {
        console.warn('면책 조항 애니메이션 설정 중 오류:', error);
      }
    }
    
    // 클린업 함수
    return () => {
      // 애니메이션 정리
      animations.forEach(anim => {
        if (anim && anim.kill) {
          anim.kill();
        }
      });
      
      // ScrollTrigger 정리
      if (ScrollTrigger && ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger && trigger.kill) {
            trigger.kill();
          }
        });
      }
      
      // 이벤트 리스너 제거
      const inputField = formRef.current?.querySelector('input');
      const button = formRef.current?.querySelector('button');
      
      if (inputField) {
        if (handlers.current.inputFocus) {
          inputField.removeEventListener('focus', handlers.current.inputFocus);
        }
        if (handlers.current.inputBlur) {
          inputField.removeEventListener('blur', handlers.current.inputBlur);
        }
      }
      
      if (button) {
        if (handlers.current.buttonEnter) {
          button.removeEventListener('mouseenter', handlers.current.buttonEnter);
        }
        if (handlers.current.buttonLeave) {
          button.removeEventListener('mouseleave', handlers.current.buttonLeave);
        }
        if (handlers.current.buttonDown) {
          button.removeEventListener('mousedown', handlers.current.buttonDown);
        }
        if (handlers.current.buttonUp) {
          button.removeEventListener('mouseup', handlers.current.buttonUp);
        }
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-green-600 text-white relative overflow-hidden"
    >
      {/* 배경 패턴 */}
      <div 
        ref={bgPatternRef}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            곤충 세계의 신비로운 소식을 받아보세요
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-lg mb-8 opacity-90"
          >
            특별한 프로모션, 새로운 곤충 소식, 사육 팁을 정기적으로 받아보세요
          </p>
          
          <form 
            ref={formRef}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input 
              type="email" 
              placeholder="이메일 주소를 입력하세요" 
              className="px-6 py-3 rounded-full text-gray-800 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-yellow-400 text-yellow-900 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors"
            >
              구독하기
            </button>
          </form>
          
          <p 
            ref={disclaimerRef}
            className="text-sm mt-4 opacity-80"
          >
            언제든지 구독 취소가 가능하며, 개인정보는 안전하게 보호됩니다
          </p>
          
          {/* 곤충 아이콘 장식 */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="text-6xl opacity-20">🐞</div>
            <div className="text-4xl opacity-20 mt-8">🦗</div>
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="text-6xl opacity-20">🦋</div>
            <div className="text-4xl opacity-20 mt-8">🐜</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;