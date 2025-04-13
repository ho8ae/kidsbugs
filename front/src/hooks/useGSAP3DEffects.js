import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록 확인
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 3D 효과가 적용된 수평 슬라이드 효과를 위한 커스텀 훅
 * @param {Object} options - 3D 슬라이드 옵션
 * @param {number} options.panelCount - 패널 수 (기본값: 4)
 * @param {number} options.zDistance - Z축 이동 거리 (기본값: -150)
 * @param {boolean} options.snap - 스냅 효과 활성화 여부 (기본값: true)
 * @param {number|Object} options.scrub - 스크롤 스무딩 정도 (기본값: 1)
 * @param {Array} options.markers - 디버그 마커 [시작색, 끝색] (기본값: undefined)
 * @param {number} options.duration - 애니메이션 지속 시간 기준 (기본값: 500)
 * @param {string} options.ease - 이징 함수 (기본값: 'power1.inOut')
 * @returns {Object} 컨테이너 및 슬라이드 컨테이너 ref
 */
export const use3DHorizontalSlide = (options = {}) => {
  const containerRef = useRef(null);
  const slideContainerRef = useRef(null);
  
  const {
    panelCount = 4,
    zDistance = -150,
    snap = true,
    scrub = 1,
    markers = undefined,
    duration = 500,
    ease = 'power1.inOut',
    onProgress = null,
    onComplete = null,
  } = options;
  
  useEffect(() => {
    if (!containerRef.current || !slideContainerRef.current) return;
    
    const container = containerRef.current;
    const slideContainer = slideContainerRef.current;
    
    // 애니메이션 타임라인 생성
    const wipeAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${duration}%`, // 스크롤 거리 설정
        pin: true,
        anticipatePin: 1,
        scrub: scrub,
        snap: snap ? {
          snapTo: 1/(panelCount-1), // 패널 수에 맞춰 조정
          duration: {min: 0.2, max: 0.5}, // 스냅 지속 시간
          delay: 0.1, // 스냅 지연 시간
          ease: ease, // 스냅 이징 함수
        } : false,
        markers: markers ? { 
          startColor: markers[0] || "green", 
          endColor: markers[1] || "red",
          fontSize: "12px" 
        } : false,
        onUpdate: (self) => {
          if (onProgress) onProgress(self);
        },
        onComplete: () => {
          if (onComplete) onComplete();
        }
      }
    });
    
    // 각 패널로 이동하는 애니메이션 생성
    for (let i = 1; i < panelCount; i++) {
      const xPos = `-${i * (100 / panelCount)}%`;
      
      // z축 이동 후 x축 이동, 다시 z축 복귀
      wipeAnimation
        .to(slideContainer, {z: zDistance, duration: 0.5, ease: ease})
        .to(slideContainer, {x: xPos, duration: 1, ease: ease})
        .to(slideContainer, {z: 0, duration: 0.5, ease: ease});
      
      // 마지막 패널이 아니면 약간의 지연 추가
      if (i < panelCount - 1) {
        wipeAnimation.to({}, {duration: 0.5}); // 지연 시간
      }
    }
    
    // 클린업 함수
    return () => {
      if (wipeAnimation.scrollTrigger) {
        wipeAnimation.scrollTrigger.kill(true);
      }
      wipeAnimation.kill();
    };
  }, [
    panelCount, zDistance, snap, scrub, markers, 
    duration, ease, onProgress, onComplete
  ]);
  
  return { containerRef, slideContainerRef };
};

/**
 * 고급 이미지 시퀀스 효과를 위한 커스텀 훅
 * @param {Object} options - 이미지 시퀀스 옵션
 * @param {string[]} options.images - 이미지 URL 배열
 * @param {number|boolean} options.scrub - 스크롤 스무딩 정도 (기본값: 1)
 * @param {string} options.start - 시작 위치 (기본값: "top center")
 * @param {string|number} options.end - 종료 위치 또는 스크롤 거리 (기본값: 300)
 * @param {Array} options.markers - 디버그 마커 [시작색, 끝색] (기본값: undefined)
 * @param {function} options.onUpdate - 업데이트 콜백 (현재 이미지 인덱스, 진행률)
 * @param {boolean} options.preloadImages - 이미지 미리 로드 여부 (기본값: true)
 * @returns {Object} 트리거, 이미지, 프로그레스 바 ref와 현재 이미지 인덱스
 */
export const useAdvancedImageSequence = (options = {}) => {
  const triggerRef = useRef(null);
  const imgRef = useRef(null);
  const progressBarRef = useRef(null);
  const currentImageIndexRef = useRef(0);
  
  const {
    images = [],
    scrub = 1,
    start = "top center",
    end = 300,
    markers = undefined,
    onUpdate = null,
    preloadImages = true,
  } = options;
  
  useEffect(() => {
    if (!triggerRef.current || !imgRef.current || images.length === 0) return;
    
    const triggerElement = triggerRef.current;
    const imageElement = imgRef.current;
    
    // 이미지 프리로딩 함수
    const preloadImagesFunc = () => {
      if (!preloadImages) return Promise.resolve();
      
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
    
    // 이미지 인덱스 객체
    const obj = { curImg: 0 };
    
    // 이미지 변경 함수
    const updateImage = () => {
      const index = Math.round(obj.curImg);
      currentImageIndexRef.current = index;
      
      if (images[index]) {
        imageElement.src = images[index];
      }
      
      // 진행 상태 바 업데이트
      if (progressBarRef.current) {
        const progress = obj.curImg / (images.length - 1);
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
      
      // 콜백 호출
      if (onUpdate) {
        onUpdate(index, obj.curImg / (images.length - 1));
      }
    };
    
    // 이미지 프리로드 후 애니메이션 설정
    preloadImagesFunc().then(() => {
      // 첫 번째 이미지 설정
      if (images[0]) {
        imageElement.src = images[0];
      }
      
      // 스크롤 트리거 애니메이션
      gsap.to(obj, {
        curImg: images.length - 1,
        roundProps: "curImg",
        ease: "none",
        onUpdate: updateImage,
        scrollTrigger: {
          trigger: triggerElement,
          start: start,
          end: typeof end === 'number' ? `+=${end}` : end,
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
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === triggerElement) {
          trigger.kill();
        }
      });
    };
  }, [images, scrub, start, end, markers, onUpdate, preloadImages]);
  
  return { 
    triggerRef, 
    imgRef, 
    progressBarRef,
    getCurrentImageIndex: () => currentImageIndexRef.current 
  };
};

/**
 * 페럴랙스 스크롤 효과를 위한 커스텀 훅
 * @param {Object} options - 페럴랙스 옵션
 * @param {number} options.speed - 이동 속도 (기본값: 0.5, 음수는 반대 방향)
 * @param {string} options.direction - 이동 방향 'x', 'y' (기본값: 'y')
 * @param {boolean} options.scrub - 스크롤 스무딩 여부 (기본값: true)
 * @param {string} options.start - 시작 위치 (기본값: "top bottom")
 * @param {string} options.end - 종료 위치 (기본값: "bottom top")
 * @returns {Object} 페럴랙스 요소 ref
 */
export const useParallaxEffect = (options = {}) => {
  const elementRef = useRef(null);
  
  const {
    speed = 0.5,
    direction = 'y',
    scrub = true,
    start = "top bottom",
    end = "bottom top",
    markers = undefined,
  } = options;
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    // 페럴랙스 애니메이션 설정
    gsap.to(element, {
      [direction]: `${speed * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: element,
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
    
    // 클린업 함수
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction, scrub, start, end, markers]);
  
  return { elementRef };
};

export default { use3DHorizontalSlide, useAdvancedImageSequence, useParallaxEffect };