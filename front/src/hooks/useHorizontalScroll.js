// src/hooks/useHorizontalScroll.js
import { useEffect, useRef } from 'react';
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

// ScrollMagic과 GSAP를 전역 스코프에 추가
window.ScrollMagic = ScrollMagic;
window.gsap = gsap;

/**
 * 수평 스크롤 슬라이드 효과를 위한 커스텀 훅
 * @param {Object} options - 설정 옵션
 * @param {number} options.duration - 스크롤 애니메이션 지속 시간 (기본값: "500%")
 * @param {boolean} options.showIndicators - 디버그 표시기 표시 여부 (기본값: false)
 * @param {number} options.panelCount - 패널 수 (기본값: 4)
 * @param {number} options.slideDelay - 슬라이드 간 딜레이 (기본값: 1)
 * @param {number} options.transitionTime - 슬라이드 전환 시간 (기본값: 1)
 * @param {number} options.zDistance - 3D 효과를 위한 Z축 이동 거리 (기본값: -150)
 */
const useHorizontalScroll = (options = {}) => {
  const containerRef = useRef(null);
  const slideRef = useRef(null);
  
  const {
    duration = "500%",
    showIndicators = false,
    panelCount = 4,
    slideDelay = 1,
    transitionTime = 1,
    zDistance = -150
  } = options;

  useEffect(() => {
    if (!containerRef.current || !slideRef.current) return;
    
    // ScrollMagic 컨트롤러 초기화
    const controller = new ScrollMagic.Controller();
    
    // 패널 이동 애니메이션 정의 (GSAP 3+ 방식)
    const wipeAnimation = gsap.timeline();
    
    // 각 패널에 대한 애니메이션 추가
    for (let i = 1; i < panelCount; i++) {
      const xPosition = `${-i * (100 / panelCount)}%`;
      
      // 첫 번째 패널은 딜레이 없이 시작
      const currentDelay = i === 1 ? 0 : slideDelay;
      
      wipeAnimation
        .to(slideRef.current, { duration: 0.5, z: zDistance, delay: currentDelay })
        .to(slideRef.current, { duration: transitionTime, x: xPosition })
        .to(slideRef.current, { duration: 0.5, z: 0 });
    }
    
    // 씬 생성하여 핀 설정 및 애니메이션 연결
    const scene = new ScrollMagic.Scene({
      triggerElement: containerRef.current,
      triggerHook: "onLeave",
      duration: duration
    })
    .setPin(containerRef.current)
    .setTween(wipeAnimation);
    
    // 디버그 표시기 추가 (옵션에 따라)
    if (showIndicators) {
      scene.addIndicators();
    }
    
    // 컨트롤러에 씬 추가
    scene.addTo(controller);
    
    // 클린업 함수
    return () => {
      scene.destroy(true);
      controller.destroy(true);
    };
  }, [duration, showIndicators, panelCount, slideDelay, transitionTime, zDistance]);
  
  return { containerRef, slideRef };
};

export default useHorizontalScroll;