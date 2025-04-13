// src/components/ProductsSection.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const ProductsSection = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: '국산 사슴벌레',
      price: '25,000원',
      desc: '초보자도 쉽게 키울 수 있는 인기 품종',
      image: '/product/상품_사슴벌레.png', // 사슴벌레 이미지
    },
    {
      name: '장수풍뎅이',
      price: '22,000원',
      desc: '튼튼한 생명력, 아이들이 가장 좋아하는 곤충',
      image: '/product/상품_장수풍뎅이.png', // 장수풍뎅이 이미지
    },
    {
      name: '가을철 왕사마귀',
      price: '18,000원',
      desc: '우아한 움직임과 독특한 생태를 관찰할 수 있는 곤충',
      image: '/product/상품_사마귀.png', // 왕사마귀 이미지
    },
    {
      name: '3령 애벌레',
      price: '15,000원',
      desc: '아이와 함께 자라는, 3령 애벌레!',
      image: '/product/상품_3령애벌레.png', // 3령 애벌레 이미지
    },
  ];

  // 요소 참조
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const productCardsRef = useRef([]);
  const buttonRef = useRef(null);

  // 이벤트 핸들러를 저장할 객체
  const handlers = useRef({
    cards: [],
    button: null,
  });

  // 클릭 시 이동 핸들러
  const handleClick = () => {
    window.open('https://smartstore.naver.com/kids-bugs?NaPm=ct%3Dm9fjlgo0%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3Dfd37b3a80b0be001745471bfcd7f0b891ae2ee7a', '_blank');
  };

  useEffect(() => {
    // 스크롤 애니메이션 설정
    const scrollAnims = [];

    // 제목 애니메이션
    if (titleRef.current) {
      const titleAnim = gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
      scrollAnims.push(titleAnim);
    }

    // 제품 카드 애니메이션
    const cards = productCardsRef.current.filter((card) => card !== null);

    cards.forEach((card, index) => {
      if (!card) return;

      // 카드 진입 애니메이션
      const cardAnim = gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
      scrollAnims.push(cardAnim);

      // 카드 호버 효과를 위한 핸들러 함수 정의
      const mouseEnterHandler = () => {
        gsap.to(card, { y: -5, duration: 0.2, ease: 'power1.out' });
      };

      const mouseLeaveHandler = () => {
        gsap.to(card, { y: 0, duration: 0.2, ease: 'power1.out' });
      };

      // 이벤트 리스너 추가
      card.addEventListener('mouseenter', mouseEnterHandler);
      card.addEventListener('mouseleave', mouseLeaveHandler);

      // 핸들러 저장 (클린업에서 사용)
      handlers.current.cards[index] = {
        element: card,
        enter: mouseEnterHandler,
        leave: mouseLeaveHandler,
      };
    });

    // 버튼 애니메이션
    if (buttonRef.current) {
      const buttonAnim = gsap.fromTo(
        buttonRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
      scrollAnims.push(buttonAnim);

      // 버튼 호버 효과
      const buttonEnterHandler = () => {
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2 });
      };

      const buttonLeaveHandler = () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
      };

      buttonRef.current.addEventListener('mouseenter', buttonEnterHandler);
      buttonRef.current.addEventListener('mouseleave', buttonLeaveHandler);

      // 핸들러 저장
      handlers.current.button = {
        element: buttonRef.current,
        enter: buttonEnterHandler,
        leave: buttonLeaveHandler,
      };
    }

    // 클린업 함수
    return () => {
      // ScrollTrigger 애니메이션 정리
      scrollAnims.forEach((anim) => {
        if (anim && anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        if (anim) {
          anim.kill();
        }
      });

      // 카드 이벤트 리스너 정리
      handlers.current.cards.forEach((handler) => {
        if (handler && handler.element && handler.enter && handler.leave) {
          try {
            handler.element.removeEventListener('mouseenter', handler.enter);
            handler.element.removeEventListener('mouseleave', handler.leave);
          } catch (error) {
            console.warn('이벤트 리스너 제거 중 오류:', error);
          }
        }
      });

      // 버튼 이벤트 리스너 정리
      if (
        handlers.current.button &&
        handlers.current.button.element &&
        handlers.current.button.enter &&
        handlers.current.button.leave
      ) {
        try {
          handlers.current.button.element.removeEventListener(
            'mouseenter',
            handlers.current.button.enter,
          );
          handlers.current.button.element.removeEventListener(
            'mouseleave',
            handlers.current.button.leave,
          );
        } catch (error) {
          console.warn('버튼 이벤트 리스너 제거 중 오류:', error);
        }
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            인기 <span className="text-green-600">애완곤충</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            아이들에게 사랑받는 애완곤충을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => (productCardsRef.current[index] = el)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="h-48 relative overflow-hidden bg-gray-100">
                {/* 실제 이미지 요소 추가 */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 이미지 로드 실패 시 대체 콘텐츠 표시
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-200"
                  style={{ display: 'none' }} // 기본적으로 숨김 상태
                >
                  <div className="text-center p-4">
                    <svg
                      className="w-10 h-10 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>{product.name} 이미지를 불러올 수 없습니다</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3 text-sm">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    {product.price}
                  </span>
                  {/* <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors">
                    구매하기
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            ref={buttonRef}
            onClick={handleClick}
            className="px-8 py-3 bg-yellow-400 text-yellow-900 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors"
          >
            모든 상품 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
