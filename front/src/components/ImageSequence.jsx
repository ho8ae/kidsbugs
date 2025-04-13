import React, { useState, useEffect } from 'react';
import useGSAPImageSequence from '../hooks/useGSAPImageSequence';

const ImageSequence = () => {
  // 이미지 시퀀스에 사용할 이미지 경로 배열
  const [images, setImages] = useState([]);
  const [durationOption, setDurationOption] = useState(0); // 기본값: 300px
  const [isLoading, setIsLoading] = useState(true);
  
  // 이미지 설정
  useEffect(() => {
    // 이미지 경로 설정
    const imageUrls = Array.from({ length: 12 }, (_, i) => 
      `/sequence/img_${(i + 1).toString().padStart(2, '0')}.png`
    );
    setImages(imageUrls);
    
    // 이미지 프리로딩
    const preloadImages = async () => {
      try {
        const promises = imageUrls.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(null); // 실패해도 진행
            img.src = src;
          });
        });
        
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error('이미지 프리로딩 중 오류:', error);
        setIsLoading(false);
      }
    };
    
    preloadImages();
  }, []);
  
  // 이미지 시퀀스 훅 사용
  const { 
    triggerRef, 
    imgRef, 
    progressBarRef,
    
    progress,
    
  } = useGSAPImageSequence({
    images: images,
    scrub: 1,
    start: "top 20%", 
    end: "bottom 20%",
    duration: durationOption,
    markers: false, // 개발 중에만 true로 변경
    preloadImages: true
  });
  

  
  return (
    <section 
      ref={triggerRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            생명의 <span className="text-green-600">신비로운 변화</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            스크롤하며 곤충의 성장 과정을 직접 확인하세요. 알에서 성충까지,
            자연의 경이로운 생명 주기를 관찰할 수 있습니다.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* 이미지 컨테이너 */}
            <div className="relative aspect-video bg-black">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <img 
                  ref={imgRef}
                  src={images[0] || "/images/placeholder.jpg"} 
                  alt="곤충 성장 과정" 
                  className="w-full h-full object-contain"
                />
              )}
              
      
            </div>
            
            {/* 진행 상태 바 */}
            <div className="h-2 bg-gray-200">
              <div 
                ref={progressBarRef}
                className="h-full bg-green-500 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            
            
          </div>
          
          <div className="text-center mt-8 text-sm text-gray-500">
            스크롤을 내리거나 올려 곤충의 성장 과정을 탐색하세요
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ImageSequence;