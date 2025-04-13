// src/components/Header.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    // 초기 로고 애니메이션
    gsap.fromTo(logoRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
    
    // 메뉴 아이템 애니메이션
    gsap.fromTo(menuItemsRef.current, 
      { opacity: 0, y: -10 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.3, 
        stagger: 0.1,
        ease: "power1.out" 
      }
    );
    
    // 스크롤에 따른 헤더 스타일 변경
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        const scrolled = self.scroll() > 50;
        
        gsap.to(headerRef.current, {
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
          boxShadow: scrolled ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
          duration: 0.3,
          ease: "power1.out"
        });
        
        // 로고 색상 변경 (스크롤할 때 진한 색상으로)
        gsap.to(logoRef.current.querySelector('.logo-text'), {
          color: scrolled ? "#15803d" : "#16a34a",
          duration: 0.3
        });
      }
    });
    
    // 클린업 함수
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 메뉴 호버 효과
  const handleMenuHover = (index, isHovering) => {
    gsap.to(menuItemsRef.current[index], {
      scale: isHovering ? 1.05 : 1,
      color: isHovering ? "#16a34a" : "inherit",
      duration: 0.2
    });
  };
  
  return (
    <header 
      ref={headerRef}
      className="fixed w-full z-50 py-4 transition-all"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          ref={logoRef}
          className="flex items-center"
        >
          <img
            src="/logo/logo.png" // 로고 이미지 경로
            alt="Logo"
            className="h-10 w-20 mr-2"
          />
          <span className="ml-2 text-sm bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full">애완곤충 전문점</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {['상품', '사육방법', '체험학습', '문의하기'].map((item, index) => (
            <a 
              key={index}
              href={`#${item}`}
              className="font-medium transition-colors"
              ref={el => menuItemsRef.current[index] = el}
              onMouseEnter={() => handleMenuHover(index, true)}
              onMouseLeave={() => handleMenuHover(index, false)}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <button 
          className="block md:hidden text-2xl"
          onClick={() => {
            gsap.to(this, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
          }}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;