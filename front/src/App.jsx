import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProductsSection from './components/ProductsSection';
import HabitatSection from './components/HabitatSection';
import WorkshopSection from './components/WorkshopSection';
import ReviewsSection from './components/ReviewsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-800 overflow-x-hidden">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ProductsSection />
          <HabitatSection />
          <WorkshopSection />
          <ReviewsSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;