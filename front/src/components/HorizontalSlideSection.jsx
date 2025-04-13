import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록을 확인
gsap.registerPlugin(ScrollTrigger);

const EnhancedHorizontalSlide = () => {
  const containerRef = useRef(null);
  const slideContainerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !slideContainerRef.current) return;

    // 애니메이션 타임라인 생성
    const wipeAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000', // 스크롤 거리 설정
        pin: true,
        anticipatePin: 1,
        scrub: 1, // 스크롤 속도에 따른 애니메이션 속도 조절
        snap: {
          snapTo: 1 / 3, // 패널 수에 맞춰 조정 (1/패널 수-1)
          duration: { min: 0.2, max: 0.5 }, // 스냅 지속 시간
          delay: 0.1, // 스냅 지연 시간
          ease: 'power1.inOut', // 스냅 이징 함수
        },
        markers: true, // 개발 중에만 사용, 배포 시 제거
      },
    });

    // 첫 번째 패널로 이동 (뒤로 이동 후 옆으로 이동)
    wipeAnimation
      .to(slideContainerRef.current, { z: -150, duration: 0.5 })
      .to(slideContainerRef.current, { x: '-25%', duration: 1 })
      .to(slideContainerRef.current, { z: 0, duration: 0.5 })

      // 두 번째 패널로 이동
      .to(slideContainerRef.current, { z: -150, duration: 0.5, delay: 0.5 })
      .to(slideContainerRef.current, { x: '-50%', duration: 1 })
      .to(slideContainerRef.current, { z: 0, duration: 0.5 })

      // 세 번째 패널로 이동
      .to(slideContainerRef.current, { z: -150, duration: 0.5, delay: 0.5 })
      .to(slideContainerRef.current, { x: '-75%', duration: 1 })
      .to(slideContainerRef.current, { z: 0, duration: 0.5 });

    // 컴포넌트 언마운트 시 ScrollTrigger 정리
    return () => {
      if (wipeAnimation.scrollTrigger) {
        wipeAnimation.scrollTrigger.kill(true);
      }
      wipeAnimation.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden perspective-container"
    >
      <div
        ref={slideContainerRef}
        className="flex w-[400%] h-full transform-style-preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* 첫 번째 패널 */}
        <section className="w-1/4 h-full flex items-center justify-center relative overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 w-full h-full">
          <img
              src="/logo/logo.png" // 실제 이미지 경로로 변경하세요
              alt="Panel 4 Background"
              className="w-full h-full object-cover"
            />
          </div>
         
        </section>

        {/* 두 번째 패널 */}
        <section className="w-1/4 h-full flex items-center justify-center relative overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/panel/사마귀.png" // 실제 이미지 경로로 변경하세요
              alt="Panel 2 Background"
              className="w-full h-full object-cover"
            />
            {/* 이미지 위에 오버레이 추가 (선택사항) */}
           
          </div>
          
        </section>

        {/* 세 번째 패널 */}
        <section className="w-1/4 h-full flex items-center justify-center relative overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/panel/장수풍뎅이.png" // 실제 이미지 경로로 변경하세요
              alt="Panel 3 Background"
              className="w-full h-full object-cover"
            />
            {/* 이미지 위에 오버레이 추가 (선택사항) */}
            {/* <div className="absolute inset-0 bg-green-500 opacity-60"></div> */}
          </div>
          
         
        </section>

        {/* 네 번째 패널 */}
        <section className="w-1/4 h-full flex items-center justify-center relative overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/panel/사슴벌레.png" // 실제 이미지 경로로 변경하세요
              alt="Panel 4 Background"
              className="w-full h-full object-cover"
            />
            
          </div>
          
          
        </section>
      </div>
    </div>
  );
};

export default EnhancedHorizontalSlide;