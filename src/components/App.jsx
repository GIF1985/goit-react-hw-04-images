import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const App = ({ API_KEY }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    setTotalHits(0);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTotalHits(data.totalHits || 0);

        if (data.hits.length === 0) {
          setError('No images found');
        }

        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages(prevImages => [...prevImages, ...data.hits]);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [searchQuery, page, API_KEY]);

  const handleImageClick = id => {
    const selectedImage = images.find(image => image.id === id);
    setSelectedImage(selectedImage);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      {isLoading && <BeatLoader color={'#123abc'} loading={true} />}
      {error && <p>Error: {error}</p>}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImageClick={handleImageClick}
          isLoading={isLoading}
        >
          {selectedImage && (
            <Modal
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
              onClose={handleCloseModal}
            />
          )}
        </ImageGallery>
      )}
      {!isLoading && images.length === 0 && <p>Please enter a search query</p>}
      {totalHits > images.length && !isLoading && images.length > 0 && (
        <Button label="Load more" onClick={handleLoadMore} />
      )}
    </div>
  );
};

App.propTypes = {
  API_KEY: PropTypes.string.isRequired,
};

export default App;
