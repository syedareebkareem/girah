import { useState } from 'react'

export default function ImageGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div>
      <div className="gallery-main" onClick={() => setLightboxOpen(true)}>
        <img src={mainImage} alt="Product" />
      </div>

      <div className="gallery-thumbs">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => setMainImage(img)}
            className={mainImage === img ? 'thumb-active' : ''}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={mainImage} alt="Lightbox" />
            <button onClick={() => setLightboxOpen(false)}>✕</button>
          </div>
        </div>
      )}
    </div>
  )
}
