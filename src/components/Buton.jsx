import React from 'react';
import PropTypes from 'prop-types';
import './List'; 

const Buttons = ({ onEdit, onDelete }) => {
  return (
    <div className="button-group">
      <button onClick={onEdit} className="button edit-button">Edit</button>
      <button onClick={onDelete} className="button delete-button">Delete</button>
    </div>
  );
};

Buttons.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Buttons;
