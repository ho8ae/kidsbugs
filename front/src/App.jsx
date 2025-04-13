import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 컴포넌트 임포트
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HabitatSection from './components/HabitatSection';
import ProductsSection from './components/ProductsSection';
import WorkshopSection from './components/WorkshopSection';
import NewsletterSection from './components/NewsletterSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import HorizontalSlideSection from './components/HorizontalSlideSection';
import ImageSequence from './components/ImageSequence';
import ParallaxSection from './components/ParallaxSection';

// 에러 경계 컴포넌트
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('컴포넌트 오류:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-700 rounded-lg m-4">
          <h2 className="text-xl font-bold mb-2">컴포넌트 오류 발생</h2>
          <p className="mb-4">해당 섹션을 렌더링할 수 없습니다.</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => this.setState({ hasError: false })}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    // GSAP 초기화 확인
    if (window.gsap && window.ScrollTrigger) {
      console.log('App: GSAP 및 ScrollTrigger 확인됨');

      // 리사이즈 이벤트에 ScrollTrigger 갱신
      const handleResize = () => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else {
      console.warn('App: GSAP 또는 ScrollTrigger를 찾을 수 없습니다');
    }
  }, []);

  return (
    <Router>
      <div className="font-sans text-gray-800 overflow-x-hidden">
        <Header />
        <main>
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <HorizontalSlideSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <ImageSequence />
          </ErrorBoundary>

          <ErrorBoundary>
            <FeaturesSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <ProductsSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <HabitatSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <WorkshopSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <ReviewsSection />
          </ErrorBoundary>

         

          <ErrorBoundary>
            <NewsletterSection />
          </ErrorBoundary>
        </main>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;