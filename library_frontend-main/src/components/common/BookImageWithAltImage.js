import React, { useState } from 'react';
import { appData } from '../../config/constants';

export default function BookImageWithAltImage({ image, title }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <img
      onError={handleImageError}
      src={image && !imageError ? image : appData.defaultBookImage}
      alt={title}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
