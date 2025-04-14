import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP ScrollTrigger를 사용한 이미지 시퀀스 효과 훅
 * @param {Object} options - 이미지 시퀀스 옵션
 * @param {string[]} options.images - 이미지 URL 배열
 * @param {number|boolean} options.scrub - 스크롤 스무딩 정도 (기본값: 1)
 * @param {string} options.start - 시작 위치 (기본값: "top center")
 * @param {string|number} options.end - 종료 위치 또는 스크롤 거리 (기본값: "bottom center")
 * @param {number} options.duration - 스크롤 거리 (픽셀), 0이면 섹션 전체를 사용 (기본값: 300)
 * @param {boolean} options.markers - 디버그 마커 표시 여부 (기본값: false)
 * @param {boolean} options.preloadImages - 이미지 미리 로드 여부 (기본값: true)
 * @returns {Object} 트리거 및 이미지 ref와 현재 이미지 인덱스, 진행률
 */
const useGSAPImageSequence = (options = {}) => {
  const {
    images = [],
    scrub = 1,
    start = "top center",
    end = "bottom center",
    duration = 300,
    markers = false,
    preloadImages = true,
  } = options;
  
  const triggerRef = useRef(null);
  const imgRef = useRef(null);
  const progressBarRef = useRef(null);
  const scrollTriggerRef = useRef(null); // ScrollTrigger 인스턴스 참조 저장
  const tweenRef = useRef(null); // Tween 인스턴스 참조 저장
  const initializedRef = useRef(false); // 초기화 여부 추적
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [useDuration, setUseDuration] = useState(duration > 0);
  const [isReady, setIsReady] = useState(false);
  
  // 이미지 프리로딩 함수
  const preloadImagesFunc = async (imageUrls) => {
    if (!preloadImages || !imageUrls || imageUrls.length === 0) return;
    
    const promises = imageUrls.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = (err) => {
          console.error(`이미지 로드 실패: ${src}`, err);
          resolve(null); // 로드 실패해도 Promise chain은 계속 진행
        };
        img.src = src;
      });
    });
    
    try {
      await Promise.all(promises);
      console.log('모든 이미지 프리로드 완료');
    } catch (err) {
      console.error('이미지 프리로드 중 오류 발생:', err);
    }
  };
  
  // ScrollTrigger 초기화 및 설정 함수
  const initScrollTrigger = useCallback(() => {
    // 이미지 배열이 비어있거나 요소 참조가 없으면 실행하지 않음
    if (!triggerRef.current || !imgRef.current || images.length === 0) {
      console.log('초기화 조건 불충족:', {
        trigger: !!triggerRef.current,
        img: !!imgRef.current,
        images: images.length
      });
      return;
    }
    
    console.log('ScrollTrigger 초기화:', {
      duration: currentDuration,
      useDuration: useDuration,
      imageCount: images.length
    });
    
    // 기존 ScrollTrigger 및 Tween 인스턴스 정리
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }
    if (tweenRef.current) {
      tweenRef.current.kill();
    }
    
    // 첫 번째 이미지 설정 (초기화 중)
    if (imgRef.current && images.length > 0) {
      imgRef.current.src = images[0];
      setCurrentIndex(0);
    }
    
    // 이미지 인덱스 객체 - GSAP에서 애니메이션할 값
    const obj = { curImg: 0 };
    
    // 이미지 변경 Tween 생성
    const tween = gsap.to(obj, {
      curImg: images.length - 1,
      roundProps: "curImg",
      ease: "none",
      onUpdate: () => {
        const index = Math.round(obj.curImg);
        
        // 이미지 변경
        if (imgRef.current && images[index]) {
          imgRef.current.src = images[index];
          setCurrentIndex(index);
        }
        
        // 진행률 업데이트
        const progressValue = obj.curImg / (images.length - 1);
        setProgress(progressValue);
        
        // 진행 상태 바 업데이트
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressValue * 100}%`;
        }
      }
    });
    
    tweenRef.current = tween;
    
    // ScrollTrigger 설정
    const endValue = useDuration ? `+=${currentDuration}` : end;
    console.log('ScrollTrigger end 값:', endValue);
    
    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: start,
      end: endValue,
      scrub: scrub,
      animation: tween,
      markers: markers,
      onUpdate: (self) => {
        // 진행률 상태 업데이트
        setProgress(self.progress);
      },
      onRefresh: () => {
        console.log('ScrollTrigger onRefresh 발생');
      }
    });
    
    scrollTriggerRef.current = scrollTrigger;
    initializedRef.current = true;
    setIsReady(true);
    
    console.log('ScrollTrigger 생성 완료');
  }, [images, scrub, start, end, currentDuration, markers, useDuration]);
  
  // 초기 설정 및 이미지 로드
  useEffect(() => {
    // 이미지 프리로드
    if (images.length > 0) {
      preloadImagesFunc(images);
    }
    
    // 이미지가 로드된 후 초기화 진행
    if (images.length > 0 && !initializedRef.current) {
      console.log('이미지 로드 후 초기화 시도');
      
      // 초기 초기화
      initScrollTrigger();
      
      // 또는 약간의 지연 후 초기화 시도 (DOM 업데이트 이후)
      setTimeout(() => {
        if (!initializedRef.current) {
          console.log('지연 초기화 시도');
          initScrollTrigger();
        }
      }, 200);
    }
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [images, initScrollTrigger]);
  
  // 문서 로드 이벤트에 대한 처리
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleDocumentLoaded = () => {
      console.log('문서 완전 로드됨 - ScrollTrigger 재초기화');
      // 재초기화 (DOM이 완전히 로드된 후)
      initScrollTrigger();
      
      // 기본 GSAP 새로고침
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    };
    
    // 이미 로드되었는지 확인
    if (document.readyState === 'complete') {
      setTimeout(handleDocumentLoaded, 100);
    } else {
      window.addEventListener('load', handleDocumentLoaded);
      return () => window.removeEventListener('load', handleDocumentLoaded);
    }
  }, [initScrollTrigger]);
  
  // 지속 시간 업데이트 함수
  const updateDuration = useCallback((newDuration) => {
    console.log('스크롤 거리 업데이트:', newDuration);
    setCurrentDuration(newDuration);
    setUseDuration(newDuration > 0);
    
    // 비동기로 설정된 상태가 업데이트된 후 ScrollTrigger 재설정
    setTimeout(() => {
      initScrollTrigger();
    }, 50);
  }, [initScrollTrigger]);
  
  // ScrollTrigger 새로고침 함수
  const refreshScrollTrigger = useCallback(() => {
    console.log('ScrollTrigger 새로고침 요청됨');
    if (typeof window !== 'undefined' && window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
    
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.refresh();
    }
  }, []);
  
  return { 
    triggerRef, 
    imgRef, 
    progressBarRef,
    currentIndex,
    progress,
    updateDuration,
    refreshScrollTrigger,
    isReady
  };
};

export default useGSAPImageSequence;