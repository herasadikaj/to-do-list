import React from 'react';
import './List.css'; 

const Buttons = ({ isEditing, onSave, onEdit, onDelete }) => {
  return (
    <div className="button-group">
      {isEditing ? (
        <button onClick={onSave} className="button save-button">Save</button>
      ) : (
        <>
          <button onClick={onEdit} className="button edit-button">Edit</button>
          <button onClick={onDelete} className="button delete-button">Delete</button>
        </>
      )}
    </div>
  );
};



export default Buttons;
