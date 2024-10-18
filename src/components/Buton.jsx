
import React from 'react';

const Buttons = (({ isEditing, onSave, onEdit, onDelete, onCancel }) => {
  return (
    <div className="button-group">
      {isEditing ? (
        <>
          <button onClick={() => { console.log("Save clicked"); onSave(); }}>Save</button>
          <button onClick={() => { console.log("Cancel clicked"); onCancel(false); }}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => { console.log("Edit clicked"); onEdit(); }}>Edit</button>
          <button onClick={() => { console.log("Delete clicked"); onDelete(); }}>Delete</button>
        </>
      )}
    </div>
  );
});

export default Buttons;



