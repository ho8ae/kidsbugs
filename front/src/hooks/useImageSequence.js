// src/hooks/useImageSequence.js
import { useEffect, useRef, useState } from 'react';

/**
 * 스크롤에 따른 이미지 시퀀스 애니메이션을 위한 커스텀 훅
 * @param {Object} options - 설정 옵션
 * @param {string[]} options.images - 이미지 URL 배열
 * @param {number} options.duration - 스크롤 애니메이션 지속 시간 (기본값: 300)
 * @param {boolean} options.showIndicators - 디버그 표시기 표시 여부 (기본값: false)
 * @param {number} options.repeat - 애니메이션 반복 횟수 (기본값: 0)
 * @param {string} options.ease - 애니메이션 이징 함수 (기본값: "none")
 */
const useImageSequence = (options = {}) => {
  const {
    images = [],
    duration = 300,
    showIndicators = false,
    repeat = 0,
    ease = "none"
  } = options;
  
  const triggerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(images[0] || '');
  const [isSceneBound, setIsSceneBound] = useState(true);
  
  useEffect(() => {
    if (!triggerRef.current || images.length === 0) return;
    
    // 전역 객체를 통해 ScrollMagic과 GSAP에 접근
    const { ScrollMagic, gsap } = window;
    
    if (!ScrollMagic || !gsap) {
      console.error('ScrollMagic 또는 GSAP가 로드되지 않았습니다.');
      return;
    }
    
    // ScrollMagic 컨트롤러 초기화
    const controller = new ScrollMagic.Controller();
    
    // 이미지 인덱스를 담을 객체
    const obj = { curImg: 0 };
    
    // 트윈 생성 (GSAP 3+ 방식)
    const tween = gsap.to(obj, {
      duration: 0.5,
      curImg: images.length - 1,
      roundProps: "curImg",
      repeat: repeat,
      immediateRender: true,
      ease: ease === "none" ? "none" : ease,
      onUpdate: function() {
        setCurrentImage(images[obj.curImg]);
      }
    });
    
    // 씬 생성
    const scene = new ScrollMagic.Scene({
      triggerElement: triggerRef.current,
      duration: isSceneBound ? duration : 0
    })
    .setTween(tween);
    
    // 디버그 표시기 추가 (옵션에 따라)
    // if (showIndicators) {
    //   scene.addIndicators();
    // }

    // 디버그 표시기 추가 (옵션에 따라)
    if (showIndicators && typeof document !== 'undefined' && document.body) {
        try {
          scene.addIndicators({
            name: "scene", // 인디케이터 이름 
            indent: 50,    // 들여쓰기 값
            colorTrigger: "blue",
            colorStart: "green",
            colorEnd: "red"
          });
        } catch (error) {
          console.warn("인디케이터 추가 실패:", error);
        }
      }
    
    // 컨트롤러에 씬 추가
    scene.addTo(controller);
    
    // 클린업 함수
    return () => {
      scene.destroy(true);
      controller.destroy(true);
    };
  }, [images, duration, showIndicators, repeat, ease, isSceneBound]);
  
  // 씬 업데이트를 위한 함수
  const updateSceneDuration = (newDuration) => {
    setIsSceneBound(newDuration > 0);
  };
  
  return { triggerRef, currentImage, updateSceneDuration };
};

export default useImageSequence;