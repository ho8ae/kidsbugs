import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// GSAP 및 플러그인을 직접 가져오기
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// GSAP 플러그인 등록 - 컴포넌트보다 먼저 등록되어야 함
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// 디버깅을 위해 GSAP를 전역 객체로 노출
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

// ScrollTrigger 설정
ScrollTrigger.config({
  ignoreMobileResize: true, // 모바일 키보드로 인한 리사이즈 무시
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" // 자동 갱신 이벤트 설정
});

// GSAP 플러그인 등록 확인
console.log("GSAP 플러그인 등록 상태:", {
  ScrollTrigger: gsap.plugins.ScrollTrigger != null,
  TextPlugin: gsap.plugins.TextPlugin != null
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
