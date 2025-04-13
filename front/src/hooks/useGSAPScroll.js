// src/hooks/useGSAPScroll.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger를 사용한 수평 스크롤 효과 훅
 * @param {Object} options - 스크롤 효과 옵션
 * @param {string} options.trigger - 트리거 요소 선택자 (기본값: ".scroll-container")
 * @param {string} options.pin - 고정할 요소 선택자 (기본값: 트리거와 동일)
 * @param {number} options.scrub - 스크롤 스무딩 정도 (기본값: 1)
 * @param {boolean} options.snap - 스냅 효과 활성화 여부 (기본값: true)
 * @param {string} options.start - 시작 위치 (기본값: "top top")
 * @param {string|function} options.end - 종료 위치 (기본값: "+=3000")
 * @param {Array} options.markers - 디버그 마커 설정 [시작색, 끝색] (기본값: undefined)
 */
export const useHorizontalScroll = (options = {}) => {
  const containerRef = useRef(null);
  const panelsRef = useRef(null);

  const {
    trigger = ".scroll-container",
    pin = null,
    scrub = 1,
    snap = true,
    start = "top top",
    end = "+=3000",
    markers = undefined,
  } = options;

  useEffect(() => {
    if (!containerRef.current || !panelsRef.current) return;

    const container = containerRef.current;
    const panels = gsap.utils.toArray(panelsRef.current.children);
    
    if (panels.length === 0) return;

    // 수평 스크롤 애니메이션 설정
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: pin || container,
        start: start,
        end: typeof end === 'function' ? end() : end,
        scrub: scrub,
        snap: snap ? 1 / (panels.length - 1) : false,
        markers: markers ? { 
          startColor: markers[0] || "green", 
          endColor: markers[1] || "red",
          fontSize: "12px" 
        } : false,
      }
    });

    // 패널 너비에 따라 이동량 계산
    const totalWidth = (panels.length - 1) * 100;
    
    // 수평 이동 애니메이션
    tl.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      duration: panels.length - 1
    });

    // 클린업 함수
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [end, markers, pin, scrub, snap, start]);

  return { containerRef, panelsRef };
};

/**
 * GSAP ScrollTrigger를 사용한 이미지 시퀀스 효과 훅
 * @param {Object} options - 이미지 시퀀스 옵션
 * @param {string[]} options.images - 이미지 URL 배열
 * @param {string} options.trigger - 트리거 요소 선택자 (기본값: ".sequence-trigger")
 * @param {number} options.scrub - 스크롤 스무딩 정도 (기본값: true)
 * @param {string} options.start - 시작 위치 (기본값: "top center")
 * @param {string} options.end - 종료 위치 (기본값: "bottom center")
 * @param {Array} options.markers - 디버그 마커 설정 [시작색, 끝색] (기본값: undefined)
 */
export const useImageSequence = (options = {}) => {
  const triggerRef = useRef(null);
  const imageRef = useRef(null);
  
  const {
    images = [],
    trigger = ".sequence-trigger",
    scrub = true,
    start = "top center",
    end = "bottom center",
    markers = undefined
  } = options;

  useEffect(() => {
    if (!triggerRef.current || !imageRef.current || images.length === 0) return;

    const triggerElement = triggerRef.current;
    const imageElement = imageRef.current;
    
    // 이미지 프리로딩 함수
    const preloadImages = () => {
      const promises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = reject;
          img.src = src;
        });
      });
      return Promise.all(promises);
    };

    // 이미지 인덱스 객체 - GSAP에서 애니메이션할 값
    const obj = { curImg: 0 };
    
    // 이미지 변경 함수
    const updateImage = () => {
      const index = Math.round(obj.curImg);
      if (images[index]) {
        imageElement.src = images[index];
      }
    };

    // 이미지 프리로드 후 애니메이션 설정
    preloadImages().then(() => {
      // 첫 번째 이미지 설정
      imageElement.src = images[0];
      
      // 스크롤 트리거 애니메이션
      gsap.to(obj, {
        curImg: images.length - 1,
        roundProps: "curImg",
        ease: "none",
        onUpdate: updateImage,
        scrollTrigger: {
          trigger: triggerElement,
          start: start,
          end: end,
          scrub: scrub,
          markers: markers ? { 
            startColor: markers[0] || "green", 
            endColor: markers[1] || "red",
            fontSize: "12px" 
          } : false,
        }
      });
    }).catch(error => {
      console.error("이미지 로드 중 오류 발생:", error);
    });

    // 클린업 함수
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [images, trigger, scrub, start, end, markers]);

  return { triggerRef, imageRef };
};

/**
 * GSAP를 사용한 요소 애니메이션 효과 훅
 * @param {Object} options - 애니메이션 옵션
 * @param {string} options.trigger - 트리거 요소 선택자
 * @param {boolean} options.fromScratch - 스크롤에 따라 처음부터 애니메이션 여부
 * @param {Object} options.animation - GSAP 애니메이션 설정
 */
export const useElementAnimation = (options = {}) => {
  const elementRef = useRef(null);
  
  const {
    trigger = null,
    fromScratch = false,
    animation = {},
    scrollTrigger = {}
  } = options;
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const triggerElement = trigger ? document.querySelector(trigger) : element;
    
    if (!triggerElement) return;
    
    // 기본 애니메이션 설정
    const defaultAnimation = {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      ...animation
    };
    
    // 처음부터 애니메이션 시작할 경우 초기 상태 설정
    if (fromScratch) {
      gsap.set(element, {
        opacity: 0,
        y: 50,
        ...animation.from
      });
    }
    
    // 애니메이션 설정
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top 80%",
        toggleActions: "play none none none",
        ...scrollTrigger
      }
    });
    
    // 처음부터 애니메이션
    if (fromScratch) {
      tl.to(element, defaultAnimation);
    } 
    // 기본 애니메이션
    else {
      tl.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        ...animation
      });
    }
    
    // 클린업 함수
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [animation, fromScratch, scrollTrigger, trigger]);
  
  return { elementRef };
};

export default { useHorizontalScroll, useImageSequence, useElementAnimation };