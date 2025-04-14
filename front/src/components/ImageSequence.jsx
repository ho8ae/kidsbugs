import React, { useState, useEffect, useRef } from 'react';
import useGSAPImageSequence from '../hooks/useGSAPImageSequence';

const ImageSequence = () => {
  // 이미지 시퀀스에 사용할 이미지 경로 배열
  const [images, setImages] = useState([]);
  const [durationOption, setDurationOption] = useState(300); // 기본값: 300px (빠르게)
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollTriggerInitTimer = useRef(null);
  
  // 이미지 설정
  useEffect(() => {
    // 이미지 경로 설정
    const imageUrls = Array.from({ length: 11 }, (_, i) => 
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
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (scrollTriggerInitTimer.current) {
        clearTimeout(scrollTriggerInitTimer.current);
      }
    };
  }, []);
  
  // 이미지 시퀀스 훅 사용 - 초기 duration 값을 기본값으로 전달
  const { 
    triggerRef, 
    imgRef, 
    progressBarRef,
    currentIndex,
    progress,
    updateDuration,
    refreshScrollTrigger,
    isReady 
  } = useGSAPImageSequence({
    images: images,
    scrub: 1,
    start: "top 20%", 
    end: "bottom 20%",
    duration: durationOption,
    markers: false,
    preloadImages: true
  });
  
  // 이미지 로드 완료 후 초기화 처리 (여러 단계의 초기화 시도)
  useEffect(() => {
    // 아직 초기화가 안 됐고, 이미지 로딩이 완료되고, 훅이 준비된 상태라면
    if (!isInitialized && !isLoading && images.length > 0 && isReady && updateDuration) {
      console.log('초기화 시도:', { 
        durationOption, 
        imagesLoaded: !isLoading, 
        imagesCount: images.length 
      });
      
      // 첫 번째 시도: 즉시 초기화
      updateDuration(durationOption);
      if (refreshScrollTrigger) refreshScrollTrigger();
      
      // 두 번째 시도: 짧은 딜레이 후 초기화 (DOM 업데이트 후)
      setTimeout(() => {
        updateDuration(durationOption);
        if (refreshScrollTrigger) refreshScrollTrigger();
      }, 100);
      
      // 세 번째 시도: 좀 더 긴 딜레이 후 초기화 (페이지 완전 로드 후)
      scrollTriggerInitTimer.current = setTimeout(() => {
        console.log('지연 초기화 실행');
        updateDuration(durationOption);
        if (typeof window !== 'undefined' && window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
        if (refreshScrollTrigger) refreshScrollTrigger();
        
        // 초기화 완료 플래그 설정
        setIsInitialized(true);
      }, 500);
    }
  }, [isLoading, images, updateDuration, refreshScrollTrigger, durationOption, isInitialized, isReady]);
  
  // 페이지 로드 완료, 리사이즈 이벤트 처리
  useEffect(() => {
    if (!updateDuration || !refreshScrollTrigger) return;
    
    const handleResize = () => {
      // 사이즈 변경 시 ScrollTrigger 재설정
      updateDuration(durationOption);
      if (refreshScrollTrigger) refreshScrollTrigger();
    };
    
    const handleLoad = () => {
      // 페이지 완전 로드 시 추가 초기화
      console.log('페이지 로드 완료 - 추가 초기화');
      updateDuration(durationOption);
      if (refreshScrollTrigger) refreshScrollTrigger();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);
    
    // 문서 로드 상태 확인 및 추가 초기화
    if (document.readyState === 'complete') {
      handleLoad();
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
    };
  }, [updateDuration, refreshScrollTrigger, durationOption]);
  
  // 지속 시간 옵션 변경 처리
  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    console.log('스크롤 속도 변경:', newDuration);
    
    setDurationOption(newDuration);
    
    if (updateDuration) {
      updateDuration(newDuration);
      
      // 변경 직후 즉시 새로고침
      if (refreshScrollTrigger) refreshScrollTrigger();
      
      // 약간의 딜레이 후 다시 한번 새로고침 (안정성 강화)
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
        if (refreshScrollTrigger) refreshScrollTrigger();
      }, 100);
    }
  };
  
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
              
              {/* 현재 이미지 표시기 */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* 진행 상태 바 */}
            <div className="h-2 bg-gray-200">
              <div 
                ref={progressBarRef}
                className="h-full bg-green-500 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            
            {/* 콘텐츠 영역 */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {currentIndex < 3 ? '알 단계' : 
                     currentIndex < 6 ? '유충 단계' : 
                     currentIndex < 9 ? '번데기 단계' : '성충 단계'}
                  </h3>
                  <p className="text-gray-600">
                    {currentIndex < 3 ? '생명의 시작, 작은 알에서 시작되는 여정' : 
                     currentIndex < 6 ? '영양분을 흡수하며 자라나는 유충 시기' : 
                     currentIndex < 9 ? '변태를 준비하는 중요한 휴식기' : '완전한 성체로 자라난 아름다운 모습'}
                  </p>
                </div>
                
                {/* 스크롤 옵션
                <div className="mt-4 sm:mt-0">
                  <form className="inline-flex items-center bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700 mr-2">스크롤 속도:</span>
                    <div className="space-x-2">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="duration" 
                          value="300" 
                          checked={durationOption === 300}
                          onChange={handleDurationChange}
                          className="form-radio text-green-600"
                        />
                        <span className="ml-1 text-sm text-gray-700">빠르게</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="duration" 
                          value="0" 
                          checked={durationOption === 0}
                          onChange={handleDurationChange}
                          className="form-radio text-green-600"
                        />
                        <span className="ml-1 text-sm text-gray-700">천천히</span>
                      </label>
                    </div>
                  </form>
                </div> */}
              </div>
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