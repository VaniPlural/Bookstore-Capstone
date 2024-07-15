import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const FloatingAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 bg-${type === 'success' ? 'green' : 'red'}-500 text-white py-2 px-4 rounded shadow-lg`}>
      {message}
    </div>
  );
};

FloatingAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FloatingAlert;
