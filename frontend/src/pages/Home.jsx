import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/editor/TopNavbar';
import './Home.css';
import heroImage from '../assets/hero.png';
import businessCardImg from '../../public/business_card.png';
import bannerImg from '../../public/hero_banner.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <TopNavbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Professional Print & Design Studio</h1>
          <p>Design online with our advanced Canva-style editor, upload your own artwork, or choose from hundreds of premium templates. Fast turnaround, high-quality finishes.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/editor/1')}>Start Designing</button>
            <button className="btn-secondary" onClick={() => navigate('/proofing')}>Upload Artwork</button>
          </div>
          
          <div className="features-row">
            <span>✓ High-Quality Print</span>
            <span>✓ Advanced Editor</span>
            <span>✓ Express Delivery</span>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Design Editor Preview" />
        </div>
      </section>

      {/* Product Categories */}
      <section className="products-section">
        <div className="section-header">
          <h2>Popular Print Products</h2>
          <p>Choose a product to start designing or uploading your artwork.</p>
        </div>
        
        <div className="products-grid">
          {/* Product 1 */}
          <div className="product-card">
            <div className="product-image">
              <img src={businessCardImg} alt="Premium Business Cards" />
              <div className="product-badge">Best Seller</div>
            </div>
            <div className="product-details">
              <h3>Premium Business Cards</h3>
              <p>90x55mm • 350gsm • Matte/Gloss</p>
              <div className="price-row">
                <span>From $49.00</span>
                <button className="btn-sm" onClick={() => navigate('/editor/1')}>Design</button>
              </div>
            </div>
          </div>
          
          {/* Product 2 */}
          <div className="product-card">
            <div className="product-image">
              <img src={bannerImg} alt="Pull-Up Banners" />
            </div>
            <div className="product-details">
              <h3>Pull-Up Banners</h3>
              <p>850x2000mm • 510gsm blockout</p>
              <div className="price-row">
                <span>From $169.00</span>
                <button className="btn-sm" onClick={() => navigate('/editor/2')}>Design</button>
              </div>
            </div>
          </div>
          
          {/* Product 3 (Placeholder) */}
          <div className="product-card">
            <div className="product-image placeholder-img">
              <span>A3 Posters</span>
            </div>
            <div className="product-details">
              <h3>A3 Posters</h3>
              <p>297x420mm • 150gsm gloss</p>
              <div className="price-row">
                <span>From $35.00</span>
                <button className="btn-sm" onClick={() => navigate('/editor/3')}>Design</button>
              </div>
            </div>
          </div>
          
          {/* Product 4 (Placeholder) */}
          <div className="product-card">
            <div className="product-image placeholder-img">
              <span>Custom Labels</span>
            </div>
            <div className="product-details">
              <h3>Custom Labels & Stickers</h3>
              <p>Any shape • Vinyl • Kiss-cut</p>
              <div className="price-row">
                <span>From $75.00</span>
                <button className="btn-sm" onClick={() => navigate('/editor/4')}>Design</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section">
        <h2>Have your own print-ready files?</h2>
        <p>Use our smart proofing system to instantly check your files for bleed, color mode, and resolution issues before printing.</p>
        <button className="btn-primary" onClick={() => navigate('/proofing')}>Go to Smart Proofing</button>
      </section>
    </div>
  );
};

export default Home;
