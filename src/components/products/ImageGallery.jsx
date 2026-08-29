import { useState } from 'react'

export default function ImageGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <img
          src={mainImage}
          alt="Product"
          onClick={() => setLightboxOpen(true)}
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => setMainImage(img)}
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '6px',
              cursor: 'pointer',
              border: mainImage === img ? '2px solid #B8C5B5' : '2px solid transparent',
              transition: 'border 0.2s ease',
            }}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          >
            <img
              src={mainImage}
              alt="Lightbox"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '32px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
