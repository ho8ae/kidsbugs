import React from 'react';
import { useParallaxEffect } from '../hooks/useGSAP3DEffects';

const ParallaxSection = () => {
  // 여러 요소에 다른 속도로 페럴랙스 효과 적용
  const { elementRef: backgroundRef } = useParallaxEffect({
    speed: -0.3, // 음수 값은 스크롤 방향과 반대로 움직임
    direction: 'y',
    scrub: true
  });
  
  const { elementRef: middleLayerRef } = useParallaxEffect({
    speed: 0.5,
    direction: 'y',
    scrub: true
  });
  
  const { elementRef: foregroundRef } = useParallaxEffect({
    speed: 0.8,
    direction: 'y',
    scrub: true
  });
  
  const { elementRef: titleRef } = useParallaxEffect({
    speed: -0.2,
    direction: 'y',
    scrub: true
  });

  return (
    <div className="relative h-screen overflow-hidden bg-gray-900">
      {/* 배경 레이어 */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%]" 
        style={{
          backgroundImage: 'url(/images/parallax/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      
      {/* 중간 레이어 */}
      <div 
        ref={middleLayerRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{
          backgroundImage: 'url(/images/parallax/middle.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      
      {/* 전경 레이어 */}
      <div 
        ref={foregroundRef}
        className="absolute inset-0 w-full h-[120%]"
        style={{
          backgroundImage: 'url(/images/parallax/foreground.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      
      {/* 텍스트 컨텐츠 */}
      <div className="relative h-full flex items-center justify-center">
        <div 
          ref={titleRef}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            페럴랙스 효과
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto px-4 drop-shadow-md">
            스크롤 시 각 레이어가 서로 다른 속도로 움직이며 입체감을 만듭니다.
            커스텀 훅을 사용하면 간단하게 이 효과를 구현할 수 있습니다.
          </p>
          <div className="mt-10">
            <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-opacity-90 transition duration-300">
              자세히 알아보기
            </button>
          </div>
        </div>
      </div>
      
      {/* 그라디언트 오버레이 (선택 사항) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 pointer-events-none"
      />
    </div>
  );
};

export default ParallaxSection;