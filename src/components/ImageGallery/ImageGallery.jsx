import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import MyLoader from '../Loader/Loader.jsx';

const ImageGallery = ({
  images,
  onImageClick,
  children = null,
  isLoading = false,
}) => {
  const galleryItems = useMemo(
    () =>
      images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
          onClick={() => onImageClick(image.id)}
        />
      )),
    [images, onImageClick]
  );

  return (
    <ul className="ImageGallery">
      {galleryItems}
      {children}
      {isLoading && <MyLoader />}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default ImageGallery;
