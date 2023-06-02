import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  const handleClick = useCallback(() => {
    onClick({ webformatURL, tags });
  }, [onClick, webformatURL, tags]);

  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
