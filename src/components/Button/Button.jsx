import React from 'react';
import PropTypes from 'prop-types';

const Button = React.memo(({ label, onClick }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {label}
    </button>
  );
});

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
