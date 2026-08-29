export default function About() {
  return (
    <div className="section" style={{ maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '42px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
          Our Story
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--text-light)' }}>
          Handcrafted crochet gifts, made with love
        </p>
      </div>

      <div className="about-block">
        <h2>Why We Crochet</h2>
        <p>
          CrochetShop started with a simple idea: bring handmade, artisan crochet pieces to people
          who appreciate quality, craftsmanship, and thoughtful gifts. Every stitch is made by hand,
          not a machine — which means no two pieces are exactly alike.
        </p>
        <p>
          We work with skilled makers using premium yarns, and we believe in slow, sustainable
          production over mass manufacturing.
        </p>
      </div>

      <div className="about-block">
        <h2>Our Values</h2>
        <div className="value-grid">
          <div className="value-item">
            <span className="yarn-tag">✓ Quality</span>
            <p>Every piece is handmade with attention to detail and quality materials.</p>
          </div>
          <div className="value-item">
            <span className="yarn-tag">🌿 Sustainable</span>
            <p>We use eco-friendly materials and support sustainable practices.</p>
          </div>
          <div className="value-item">
            <span className="yarn-tag">🤝 Artisan-Led</span>
            <p>We support independent makers and fair-trade practices.</p>
          </div>
          <div className="value-item">
            <span className="yarn-tag">💛 Care</span>
            <p>Your happiness is our priority. We stand behind every product.</p>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Have Questions?</h2>
        <p>Reach out anytime — we love hearing from our customers.</p>
        <a href="/contact" className="btn btn-primary">Contact Us</a>
      </div>
    </div>
  )
}
