import React from 'react';
import { useHorizontalScroll } from '../hooks/useGSAPScroll';

const HorizontalSlideSection = () => {
  // useHorizontalScroll 훅 사용
  const { containerRef, panelsRef } = useHorizontalScroll({
    scrub: 1,
    snap: true,
    markers: ['green', 'red'], // 개발 중에만 사용하고 배포 시 제거
    end: () => `+=${window.innerWidth * 3}` // 패널 개수에 따라 동적으로 계산
  });

  return (
    <div className="relative h-screen overflow-hidden" ref={containerRef}>
      <div className="flex h-full" ref={panelsRef}>
        {/* 첫 번째 패널 */}
        <div className="min-w-full h-full flex items-center justify-center bg-blue-500">
          <div className="text-center p-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">PANEL ONE</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              스크롤을 내리면 수평으로 이동합니다. 이 섹션은 GSAP ScrollTrigger를 사용한 수평 스크롤 예제입니다.
            </p>
          </div>
        </div>

        {/* 두 번째 패널 */}
        <div className="min-w-full h-full flex items-center justify-center bg-teal-500">
          <div className="text-center p-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">PANEL TWO</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              두 번째 패널입니다. 스크롤을 계속 내리면 애니메이션과 함께 다음 패널로 이동합니다.
            </p>
          </div>
        </div>

        {/* 세 번째 패널 */}
        <div className="min-w-full h-full flex items-center justify-center bg-green-500">
          <div className="text-center p-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">PANEL THREE</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              세 번째 패널입니다. 이 효과는 Z축 애니메이션을 포함한 3D 효과를 줄 수도 있습니다.
            </p>
          </div>
        </div>

        {/* 네 번째 패널 */}
        <div className="min-w-full h-full flex items-center justify-center bg-red-500">
          <div className="text-center p-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">PANEL FOUR</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              마지막 패널입니다. 여기서 스크롤을 계속하면 다음 섹션으로 이동합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSlideSection;