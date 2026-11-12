import { useState } from 'react'
import './App.css'

// =============================================================================
// 💡 STUDENTS / INSTRUCTOR: PRODUCT CATALOG DATA
// Change any price, title, or description here, push to GitHub, and watch
// your changes automatically build and deploy through the CI/CD pipeline!
// =============================================================================
const MENU_ITEMS = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe Pour-Over',
    category: 'Single Origin Coffee',
    price: '$4.75',
    description: 'Delicate floral jasmine notes with vibrant citrus acidity and honey sweetness.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Signature Cold Brew Reserve',
    category: 'Chilled Drinks',
    price: '$5.25',
    description: 'Steeped for 18 hours in cold filtered water. Smooth, chocolatey, and naturally sweet.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Velvet Flat White',
    category: 'Espresso & Milk',
    price: '$4.50',
    description: 'Double ristretto espresso paired with micro-foamed organic steamed milk.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Caramelized Butter Croissant',
    category: 'Fresh Bakery',
    price: '$3.80',
    description: 'Hand-rolled daily using French cultured butter. Flaky layers baked to golden perfection.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Avocado Sourdough Toast',
    category: 'Breakfast Kitchen',
    price: '$8.50',
    description: 'Crushed Hass avocado on toasted artisanal sourdough with chili flakes and microgreens.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'House Blend Whole Beans (12oz)',
    category: 'Packaged Beans',
    price: '$16.00',
    description: 'Locally small-batch roasted blend with tasting notes of toasted almond and dark cocoa.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80'
  }
]

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Local Guide',
    quote: 'The best flat white in town without question. The atmosphere is warm and the pastries are baked fresh every single morning.'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Coffee Enthusiast',
    quote: 'Their Ethiopian single origin pour-over is magnificent. Clean, bright, and roasted to perfection. A true neighborhood gem.'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Neighborhood Regular',
    quote: 'I pick up their cold brew and butter croissants three days a week. Exceptional quality and very friendly baristas!'
  }
]

const CURRENT_YEAR = new Date().getFullYear()

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setSubscribed(true)
      setNewsletterEmail('')
    }
  }

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="nav-content">
          <a href="#" className="brand-logo">
            {/* <span className="brand-icon">☕</span> */}
            <span>Brew &amp; Bean</span>
          </a>

          <nav>
            <ul className="nav-links">
              <li><a href="#menu">Our Menu</a></li>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#visit">Visit Us</a></li>
            </ul>
          </nav>

          <button className="cart-button" aria-label="Shopping Cart">
            <span>Order</span>
            <span className="cart-badge" data-testid="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80"
          alt="Artisan Coffee Roasters Cafe Interior"
          className="hero-background"
        />
        <div className="hero-content">
          <p className="hero-subtitle">Small-Batch Roasters &bull; Handcrafted Daily</p>
          <h1 className="hero-title">Freshly Roasted Coffee, Crafted with Passion.</h1>
          <p className="hero-desc">
            We ethically source single-origin green beans from sustainable growers around the world, roasting them in small batches to highlight their unique character and flavor.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="btn-primary">Explore Menu</a>
            <a href="#visit" className="btn-secondary">Visit Our Cafe</a>
          </div>
        </div>
      </section>

      {/* Highlights Banner */}
      <section className="highlights-bar">
        <div className="highlights-content">
          <div className="highlight-item">
            <h3>🌱 100% Ethical Sourcing</h3>
            <p>Direct trade partnerships with sustainable family farms.</p>
          </div>
          <div className="highlight-item">
            <h3>🔥 Roasted In-House</h3>
            <p>Fresh weekly roasting profiles for peak aroma and flavor.</p>
          </div>
          <div className="highlight-item">
            <h3>🥐 Artisanal Bakery</h3>
            <p>Pastries and sourdough baked from scratch every dawn.</p>
          </div>
        </div>
      </section>

      {/* Featured Menu & Store Catalog */}
      <section id="menu" className="section">
        <div className="section-header">
          <p className="section-tag">Carefully Curated</p>
          <h2 className="section-title">Our Seasonal Menu</h2>
          <p className="section-desc">
            From pour-overs to oven-fresh pastries, every single item is made fresh with high quality ingredients.
          </p>
        </div>

        <div className="products-grid">
          {MENU_ITEMS.map((item) => (
            <article key={item.id} className="product-card" data-testid={`menu-item-${item.id}`}>
              <img src={item.image} alt={item.name} className="product-image" loading="lazy" />
              <div className="product-body">
                <span className="product-category">{item.category}</span>
                <h3 className="product-title">{item.name}</h3>
                <p className="product-desc">{item.description}</p>
                <div className="product-footer">
                  <span className="product-price">{item.price}</span>
                  <button
                    className="btn-add"
                    onClick={handleAddToCart}
                    aria-label={`Add ${item.name} to order`}
                  >
                    + Add to Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <div id="story" className="story-wrapper">
        <section className="section">
          <div className="story-grid">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80"
              alt="Barista brewing specialty coffee"
              className="story-image"
              loading="lazy"
            />
            <div className="story-text">
              <p className="section-tag">Since 2018</p>
              <h3>Rooted in Community, Obsessed with Quality</h3>
              <p>
                Brew &amp; Bean began as a humble vintage coffee cart serving pour-overs at Saturday farmers markets. Today, our roastery and cafe serve as a neighborhood sanctuary where friends meet, ideas ignite, and coffee is celebrated as an art form.
              </p>
              <p>
                Every batch of beans is roasted with precision, monitoring temperature curves to ensure each origin&apos;s natural sweetness, floral notes, and chocolate undertones shine through.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Customer Testimonials */}
      <section id="reviews" className="section">
        <div className="section-header">
          <p className="section-tag">Customer Love</p>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-desc">Proudly serving over 500 cups of freshly roasted coffee daily.</p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-quote">&ldquo;{review.quote}&rdquo;</p>
              <div className="reviewer-name">{review.name}</div>
              <div className="reviewer-tag">{review.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visit Us / Location & Hours */}
      <section id="visit" className="section" style={{ paddingTop: '1rem' }}>
        <div className="visit-box">
          <div className="visit-item">
            <h4>📍 Cafe Location</h4>
            <p>142 Artisan Boulevard, Suite 100<br />Downtown Arts District</p>
          </div>
          <div className="visit-item">
            <h4>⏰ Opening Hours</h4>
            <p>Mon &ndash; Fri: 6:30 AM &ndash; 6:00 PM<br />Sat &ndash; Sun: 7:30 AM &ndash; 7:00 PM</p>
          </div>
          <div className="visit-item">
            <h4>📞 Contact &amp; Orders</h4>
            <p>(555) 382-9104<br />hello@brewandbean.com</p>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
            Join Our Coffee Club
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Subscribe to receive roast updates, brewing guides, and 10% off your first whole bean order.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', maxWidth: '460px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{ flex: 1, minWidth: '240px', padding: '0.75rem 1rem', border: '1px solid var(--border-light)', borderRadius: '6px', fontSize: '0.95rem' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '6px' }}>
                Subscribe
              </button>
            </form>
          ) : (
            <p style={{ color: '#15803d', fontWeight: 600, fontSize: '1rem' }}>
              🎉 Thank you for subscribing! Check your inbox for your 10% discount code.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">Brew &amp; Bean Co.</div>
          <p style={{ fontSize: '0.9rem' }}>Freshly roasted coffee &bull; Handcrafted daily with love</p>
        </div>
        <div className="footer-bottom">
          <span>&copy; {CURRENT_YEAR} Brew &amp; Bean Coffee Roasters. All rights reserved.</span>
          <span>Version 1.0.0</span>
        </div>
      </footer>
    </div>
  )
}
