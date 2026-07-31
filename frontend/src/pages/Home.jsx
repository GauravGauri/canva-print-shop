import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/editor/TopNavbar';
import heroImage from '../assets/hero.png';
import businessCardImg from '../../public/business_card.png';
import bannerImg from '../../public/hero_banner.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-primary-gray font-sans">
      <TopNavbar />
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-12">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary-dark leading-tight">Professional Print & Design Studio</h1>
          <p className="text-lg text-text-light leading-relaxed">Design online with our advanced Canva-style editor, upload your own artwork, or choose from hundreds of premium templates. Fast turnaround, high-quality finishes.</p>
          <div className="flex gap-4 mt-4">
            <button className="bg-primary-dark hover:bg-primary-blue text-white px-8 py-3 rounded-full font-medium transition-colors" onClick={() => navigate('/editor/1')}>Start Designing</button>
            <button className="bg-white hover:bg-gray-50 text-primary-dark border border-border-gray px-8 py-3 rounded-full font-medium transition-colors" onClick={() => navigate('/proofing')}>Upload Artwork</button>
          </div>
          
          <div className="flex items-center gap-6 mt-8 text-sm font-medium text-text-main">
            <span className="flex items-center gap-2">✓ High-Quality Print</span>
            <span className="flex items-center gap-2">✓ Advanced Editor</span>
            <span className="flex items-center gap-2">✓ Express Delivery</span>
          </div>
        </div>
        <div className="relative w-full max-w-lg hidden md:block">
          <img src={heroImage} alt="Design Editor Preview" className="w-full h-auto drop-shadow-2xl rounded-xl" />
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-white py-24 border-t border-border-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-primary-dark">Popular Print Products</h2>
            <p className="text-text-light max-w-2xl">Choose a product to start designing or uploading your artwork.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div className="group flex flex-col bg-white border border-border-gray rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img src={businessCardImg} alt="Premium Business Cards" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">Best Seller</div>
              </div>
              <div className="flex flex-col p-6 gap-2">
                <h3 className="font-semibold text-lg text-primary-dark">Premium Business Cards</h3>
                <p className="text-sm text-text-light">90x55mm • 350gsm • Matte/Gloss</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-primary-blue">From $49.00</span>
                  <button className="bg-primary-gray hover:bg-border-gray text-text-main px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => navigate('/editor/1')}>Design</button>
                </div>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="group flex flex-col bg-white border border-border-gray rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img src={bannerImg} alt="Pull-Up Banners" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col p-6 gap-2">
                <h3 className="font-semibold text-lg text-primary-dark">Pull-Up Banners</h3>
                <p className="text-sm text-text-light">850x2000mm • 510gsm blockout</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-primary-blue">From $169.00</span>
                  <button className="bg-primary-gray hover:bg-border-gray text-text-main px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => navigate('/editor/2')}>Design</button>
                </div>
              </div>
            </div>
            
            {/* Product 3 (Placeholder) */}
            <div className="group flex flex-col bg-white border border-border-gray rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative aspect-video bg-indigo-50 flex items-center justify-center text-indigo-200 font-medium">
                <span>A3 Posters</span>
              </div>
              <div className="flex flex-col p-6 gap-2">
                <h3 className="font-semibold text-lg text-primary-dark">A3 Posters</h3>
                <p className="text-sm text-text-light">297x420mm • 150gsm gloss</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-primary-blue">From $35.00</span>
                  <button className="bg-primary-gray hover:bg-border-gray text-text-main px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => navigate('/editor/3')}>Design</button>
                </div>
              </div>
            </div>
            
            {/* Product 4 (Placeholder) */}
            <div className="group flex flex-col bg-white border border-border-gray rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative aspect-video bg-amber-50 flex items-center justify-center text-amber-200 font-medium">
                <span>Custom Labels</span>
              </div>
              <div className="flex flex-col p-6 gap-2">
                <h3 className="font-semibold text-lg text-primary-dark">Custom Labels & Stickers</h3>
                <p className="text-sm text-text-light">Any shape • Vinyl • Kiss-cut</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-primary-blue">From $75.00</span>
                  <button className="bg-primary-gray hover:bg-border-gray text-text-main px-4 py-2 rounded-lg text-sm font-medium transition-colors" onClick={() => navigate('/editor/4')}>Design</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary-dark text-white py-24 text-center px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold tracking-tight">Have your own print-ready files?</h2>
          <p className="text-lg text-slate-300">Use our smart proofing system to instantly check your files for bleed, color mode, and resolution issues before printing.</p>
          <button className="mt-4 bg-primary-blue hover:bg-primary-blue-hover text-white px-8 py-3 rounded-full font-medium transition-colors" onClick={() => navigate('/proofing')}>Go to Smart Proofing</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
