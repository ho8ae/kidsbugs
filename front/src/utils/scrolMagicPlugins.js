// src/utils/scrollMagicPlugins.js
import ScrollMagic from 'scrollmagic';
import gsap from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// GSAP 3+ 버전에서는 TweenMax, TimelineMax 대신 gsap 객체 사용
ScrollMagicPluginGsap(ScrollMagic, gsap);

// GSAP을 전역 객체에 추가 (ScrollMagic 플러그인이 이를 필요로 함)
window.gsap = gsap;

export default ScrollMagic;