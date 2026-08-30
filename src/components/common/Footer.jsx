import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Footer() {
  const { showToastMessage } = useCart();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showToastMessage("Please enter a valid email", "error");
      return;
    }
    showToastMessage("Subscribed! Check your inbox for 10% off.", "success");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "16px",
              color: "var(--cream)",
            }}
          >
            Crochet
            <span style={{ color: "var(--mustard)", fontStyle: "italic" }}>
              Shop
            </span>
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(251,243,231,0.65)",
              marginBottom: "16px",
            }}
          >
            Handcrafted crochet gifts made with love
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(251,243,231,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--rust)'; e.currentTarget.style.borderColor = 'var(--rust)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(251,243,231,0.3)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(251,243,231,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--rust)'; e.currentTarget.style.borderColor = 'var(--rust)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(251,243,231,0.3)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://pinterest.com/yourhandle" target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(251,243,231,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', textDecoration: 'none', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--rust)'; e.currentTarget.style.borderColor = 'var(--rust)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(251,243,231,0.3)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4
            style={{
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: "16px",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Shop
          </h4>
          <ul style={{ listStyle: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/shop"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                All Products
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/shop"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                New Arrivals
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/shop"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                Sale
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                Best Sellers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: "16px",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Help
          </h4>
          <ul style={{ listStyle: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/contact"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                Contact Us
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/contact"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                FAQ
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/contact"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                Shipping Info
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{
                  color: "rgba(251,243,231,0.65)",
                  textDecoration: "none",
                }}
              >
                Returns
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontWeight: 700,
              color: "var(--cream)",
              marginBottom: "16px",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Newsletter
          </h4>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(251,243,231,0.65)",
              marginBottom: "12px",
            }}
          >
            Get 10% off your first order
          </p>
          <form onSubmit={handleSubscribe} style={{ display: "flex" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 12px",
                fontSize: "14px",
                background: "rgba(251,243,231,0.08)",
                border: "1px solid rgba(251,243,231,0.2)",
                borderRadius: "100px 0 0 100px",
                outline: "none",
                color: "var(--cream)",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 18px",
                background: "var(--rust)",
                color: "white",
                fontSize: "13px",
                fontWeight: 700,
                borderRadius: "0 100px 100px 0",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(251,243,231,0.15)",
          padding: "24px 16px",
          textAlign: "center",
          fontSize: "13px",
          color: "rgba(251,243,231,0.5)",
        }}
      >
        <p>&copy; 2026 CrochetShop. Handmade with heart.</p>
      </div>
    </footer>
  );
}
