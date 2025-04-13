// src/utils/scrollMagicCompat.js

// ScrollMagic과 GSAP의 호환성을 위한 유틸리티 함수
const setupScrollMagicCompat = () => {
    // CDN으로 로드한 ScrollMagic과 GSAP를 확인
    if (window.ScrollMagic && window.gsap) {
      
      // GSAP 3 호환성을 위한 별칭 설정
      window.TweenMax = window.gsap;
      window.TimelineMax = window.gsap.timeline;
      
      // ScrollMagic의 GSAP 플러그인이 이미 로드된 경우 추가 설정 불필요
      return true;
    } else {
      
      return false;
    }
  };
  
  export default setupScrollMagicCompat;