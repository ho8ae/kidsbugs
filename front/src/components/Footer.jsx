// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: '쇼핑하기',
      links: ['사슴벌레', '장수풍뎅이', '왕사마귀', '귀뚜라미', '곤충 먹이', '사육용품']
    },
    {
      title: '정보',
      links: ['사육 가이드', '곤충 사전', '체험학습', 'FAQ', '배송 정책', '교환 및 환불']
    },
    {
      title: '회사 소개',
      links: ['키즈벅스 소개', '연혁', '찾아오시는 길', '채용정보', '제휴 문의']
    }
  ];

  // 요소 참조
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const sectionRefs = useRef([]);
  const bottomRef = useRef(null);
  const socialLinksRef = useRef(null);
  const bottomLinksRef = useRef([]);
  
  // 애니메이션 저장소
  const animations = useRef([]);
  
  useEffect(() => {
    const anims = [];
    
    // 푸터 전체 페이드인 효과
    if (footerRef.current) {
      const footerAnim = gsap.fromTo(footerRef.current, 
        { opacity: 0.7 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
      anims.push(footerAnim);
    }
    
    // 로고 애니메이션
    if (logoRef.current) {
      const logoAnim = gsap.fromTo(logoRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
      anims.push(logoAnim);
    }
    
    // 소셜 미디어 링크 애니메이션
    if (socialLinksRef.current) {
      const socialIcons = Array.from(socialLinksRef.current.querySelectorAll('.social-icon') || []);
      
      if (socialIcons.length > 0) {
        const socialAnim = gsap.fromTo(socialIcons,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            delay: 0.3,
            scrollTrigger: {
              trigger: socialLinksRef.current,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
        anims.push(socialAnim);
      }
    }
    
    // 푸터 섹션 애니메이션
    const validSections = sectionRefs.current.filter(section => section !== null);
    validSections.forEach((section, index) => {
      if (!section) return;
      
      const title = section.querySelector('h3');
      if (title) {
        // 제목 애니메이션
        const titleAnim = gsap.fromTo(title,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 + (index * 0.1),
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
        anims.push(titleAnim);
      }
      
      const links = Array.from(section.querySelectorAll('li') || []);
      if (links.length > 0) {
        // 링크 애니메이션
        const linksAnim = gsap.fromTo(links,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.3,
            delay: 0.2 + (index * 0.1),
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
        anims.push(linksAnim);
      }
    });
    
    // 하단 정보 애니메이션
    if (bottomRef.current) {
      const infoItems = Array.from(bottomRef.current.querySelectorAll('p') || []);
      
      if (infoItems.length > 0) {
        const infoAnim = gsap.fromTo(infoItems,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.5,
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
        anims.push(infoAnim);
      }
      
      const links = Array.from(bottomRef.current.querySelectorAll('a') || []);
      if (links.length > 0) {
        const linksAnim = gsap.fromTo(links,
          { opacity: 0.7 },
          { 
            opacity: 1, 
            duration: 0.5, 
            delay: 0.7,
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 95%"
            }
          }
        );
        anims.push(linksAnim);
      }
    }
    
    // 모든 애니메이션 저장
    animations.current = anims;
    
    // 클린업 함수
    return () => {
      // 애니메이션 정리
      animations.current.forEach(anim => {
        if (anim && anim.scrollTrigger) {
          anim.scrollTrigger.kill();
        }
        if (anim && anim.kill) {
          anim.kill();
        }
      });
      
      // GSAP의 ScrollTrigger 모두 정리
      if (gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach(trigger => {
          trigger.kill();
        });
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div 
              ref={logoRef}
              className="mb-6"
            >
              <span className="text-2xl font-bold text-white">KidsBugs</span>
              <span className="ml-2 text-sm bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full">애완곤충 전문점</span>
            </div>
            <p className="text-gray-400 mb-6">
              자연과 함께 자라는 아이들의 특별한 친구, 키즈벅스와 함께 신비로운 곤충의 세계를 경험해보세요.
            </p>
            <div 
              ref={socialLinksRef}
              className="flex space-x-4"
            >
              {['facebook', 'instagram', 'youtube', 'blog'].map((social, index) => (
                <a 
                  key={index}
                  href={`#${social}`}
                  className="social-icon w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {/* 소셜 미디어 아이콘 */}
                  {social === 'facebook' && <span className="text-lg">f</span>}
                  {social === 'instagram' && <span className="text-lg">📷</span>}
                  {social === 'youtube' && <span className="text-lg">▶</span>}
                  {social === 'blog' && <span className="text-lg">B</span>}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div 
              key={index}
              ref={el => sectionRefs.current[index] = el}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={`#${link}`} className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div 
          ref={bottomRef}
          className="border-t border-gray-800 pt-8 mt-8 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center"
        >
          <p>© {currentYear} 키즈벅스(KidsBugs). 모든 권리 보유.</p>
          <p className="mt-2 md:mt-0">대표: 강복순 | 사업자 등록번호: 123-45-67890</p>
          <p className="mt-2 md:mt-0">주소: 서울특별시 강남구 테헤란로 123 | 전화: 010-9789-7457</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#terms" className="hover:text-white transition-colors">이용약관</a>
            <a href="#contact" className="hover:text-white transition-colors">고객센터</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;