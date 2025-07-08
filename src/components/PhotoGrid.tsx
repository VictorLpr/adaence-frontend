'use client'

import '../styles/PhotoGrid.css';

const areaNames = [
  'img1', 'img2', 'img3', 'img4',
  'img5', 'img6', 'img7', 'img8'];

export default function PhotoGrid({ images } : { images: string[] }): React.ReactElement {
    return (
      <div className="photo-grid">
        {images.map((image, index) => (
         <div
          key={index}
          className="photo-item"
          style={{ gridArea: areaNames[index] }}
        >
            <img src={image} alt={`person-${index+1}`} />
          </div>
        ))}
      </div>
    );
  }