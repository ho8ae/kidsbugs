import { useEffect, useRef, useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [useDuration, setUseDuration] = useState(duration > 0);
  
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
  
  useEffect(() => {
    // 이미지 배열이 비어있거나 요소 참조가 없으면 실행하지 않음
    if (!triggerRef.current || !imgRef.current || images.length === 0) {
      return;
    }
    
    // 이미지 프리로드
    preloadImagesFunc(images);
    
    // 첫 번째 이미지 설정
    if (imgRef.current && images.length > 0) {
      imgRef.current.src = images[0];
      setCurrentIndex(0);
    }
    
    // 이미지 인덱스 객체 - GSAP에서 애니메이션할 값
    const obj = { curImg: 0 };
    
    // 기존 ScrollTrigger 인스턴스 정리
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
      if (trigger.vars.trigger === triggerRef.current) {
        trigger.kill();
      }
    });
    
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
    
    // ScrollTrigger 설정
    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: start,
      end: useDuration ? `+=${duration}` : end,
      scrub: scrub,
      animation: tween,
      markers: markers,
      onUpdate: (self) => {
        // 진행률 상태 업데이트 (필요 시)
        setProgress(self.progress);
      }
    });
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [images, scrub, start, end, duration, markers, preloadImages, useDuration]);
  
  // 지속 시간 업데이트 함수
  const updateDuration = (newDuration) => {
    setUseDuration(newDuration > 0);
  };
  
  return { 
    triggerRef, 
    imgRef, 
    progressBarRef,
    currentIndex,
    progress,
    updateDuration
  };
};

export default useGSAPImageSequence;