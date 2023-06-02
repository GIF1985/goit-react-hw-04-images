import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ src, alt, onClose }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = useCallback(
    event => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={alt} className="Modal-image" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
