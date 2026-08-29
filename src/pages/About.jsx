export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D', textAlign: 'center' }}>
            About CrochetShop
          </h1>

          <p style={{ fontSize: '18px', color: '#999999', textAlign: 'center', marginBottom: '64px' }}>
            Handmade crochet gifts crafted with love and care
          </p>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Our Story
            </h2>
            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8', marginBottom: '16px' }}>
              CrochetShop was founded with a simple mission: to bring handmade, artisan crochet products to people who appreciate quality, craftsmanship, and unique gifts.
            </p>
            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
              Each item is carefully crafted by skilled artisans using premium materials. We believe in supporting sustainable practices and creating pieces that last a lifetime.
            </p>
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Our Values
            </h2>
            <div style={{ display: 'grid', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Quality Craftsmanship
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  Every piece is handmade with attention to detail and quality materials.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Sustainability
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  We use eco-friendly materials and support sustainable practices.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Artisan Support
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  We support independent artisans and fair-trade practices.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Customer Satisfaction
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  Your happiness is our priority. We stand behind every product.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Production Process
            </h2>
            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8', marginBottom: '24px' }}>
              Each product goes through multiple stages of quality control:
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {['Design & Planning', 'Material Selection', 'Handcrafting', 'Quality Check', 'Packaging', 'Delivery'].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#B8C5B5',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>{step}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ backgroundColor: '#F8F8F7', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Have Questions?
            </h2>
            <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
              Reach out to us anytime. We love hearing from our customers.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
