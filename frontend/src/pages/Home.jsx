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
          <li><Link to="/">Products</Link></li>
          <li><Link to="/templates">Templates</Link></li>
          <li><Link to="/editor/1">Editor</Link></li>
          <li><Link to="/proofing">Proofing</Link></li>
          <li><Link to="/tracking">Tracking</Link></li>
        </ul>
        <div className="nav-actions">
          <button className="login-btn" onClick={() => navigate('/admin')}>Login</button>
          <button className="start-btn" onClick={() => navigate('/editor/1')}>Start Design</button>
        </div>
      </nav>

      <header className="store-hero">
        <div className="hero-content">
          <div className="location-badge">📍 Local South Australian print shop with online design tools</div>
          <h1>Create, proof, and order prints like Canva.</h1>
          <p>A premium print shop website for business cards, flyers, posters, banners, signs, labels, stickers, T-shirts, menus, and custom branding — with an advanced editor, automatic artwork checks, instant pricing, and live order tracking.</p>
          
          <div className="hero-actions">
            <button className="btn-primary-large" onClick={() => navigate('/editor/1')}>Start Designing <span>›</span></button>
            <button className="btn-outline-large" onClick={() => navigate('/proofing')}>Upload Artwork</button>
          </div>

          <div className="hero-features">
            <div className="feature">
              <h4>1200dpi</h4>
              <span>Label quality</span>
            </div>
            <div className="feature">
              <h4>48hr</h4>
              <span>Fast options</span>
            </div>
            <div className="feature">
              <h4>AU-wide</h4>
              <span>Shipping</span>
            </div>
          </div>
        </div>
        <div className="hero-graphic">
           <img src="/hero_banner.png" alt="Cafe Grand Opening Banner" className="hero-image" />
           <div className="hero-mock-ui">
             <div className="mock-tools">
               <span className="mock-tool-icon">T</span>
               <span className="mock-tool-icon">🖼️</span>
               <span className="mock-tool-icon">▲</span>
             </div>
             <div className="mock-checks">
                <h5>Artwork Check</h5>
                <ul>
                  <li>✅ 5mm bleed</li>
                  <li>✅ CMYK colours</li>
                  <li>✅ 300dpi images</li>
                  <li>✅ Safe margins</li>
                </ul>
                <button className="mock-order-btn">🛒 Order</button>
             </div>
           </div>
        </div>
      </header>

      <section className="product-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">ONLINE PRINT PRODUCTS</span>
            <h2>Choose a product and customise it.</h2>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="🔍 Search products..." />
          </div>
        </div>

        <div className="product-grid">
          {/* Product 1 */}
          <div className="store-product-card">
            <div className="card-image bg-gray">
              <img src="/business_card.png" alt="Business Cards" />
            </div>
            <div className="card-body">
              <div className="card-title-row">
                <h4>Business Cards</h4>
                <span className="badge popular">Popular</span>
              </div>
              <p>Premium stocks, matte/gloss/velvet lamination</p>
              <div className="card-footer">
                <span className="price">$109.99</span>
                <Link to="/editor/1"><button className="design-now-btn">Design Now</button></Link>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="store-product-card">
            <div className="card-image bg-blue">
              <div style={{width:'100%', height:'100%', backgroundColor: '#e2e8f0', display: 'flex', alignItems:'center', justifyContent:'center', color: '#64748b'}}>Banner Image</div>
            </div>
            <div className="card-body">
              <div className="card-title-row">
                <h4>Pull-Up Banners</h4>
                <span className="badge offer">Offer</span>
              </div>
              <p>510gsm scrimless media, hardware & padded bag</p>
              <div className="card-footer">
                <span className="price">25% Off</span>
                <Link to="/editor/2"><button className="design-now-btn">Design Now</button></Link>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="store-product-card">
            <div className="card-image bg-purple">
               <div style={{width:'100%', height:'100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems:'center', justifyContent:'center', color: '#64748b'}}>Poster Image</div>
            </div>
            <div className="card-body">
              <div className="card-title-row">
                <h4>Posters</h4>
                <span className="badge fast">Fast</span>
              </div>
              <p>A3 to A0, synthetic & paper options</p>
              <div className="card-footer">
                <span className="price">From A3</span>
                <Link to="/editor/3"><button className="design-now-btn">Design Now</button></Link>
              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="store-product-card">
            <div className="card-image bg-yellow">
               <div style={{width:'100%', height:'100%', backgroundColor: '#fef3c7', display: 'flex', alignItems:'center', justifyContent:'center', color: '#64748b'}}>Stickers Image</div>
            </div>
            <div className="card-body">
              <div className="card-title-row">
                <h4>Labels & Stickers</h4>
                <span className="badge default">1200dpi</span>
              </div>
              <p>Rolls, sheets, waterproof, barcode-ready</p>
              <div className="card-footer">
                <span className="price">Any Qty</span>
                <Link to="/editor/4"><button className="design-now-btn">Design Now</button></Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
