import React, { useEffect, useState } from 'react';

const Image = ({ imageBinary }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const objectUrl = URL.createObjectURL(imageBinary);
    setImageUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageBinary]);

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt="Hình ảnh" />}
    </div>
  );
};

export default Image;
