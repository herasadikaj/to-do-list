import React, { useState } from 'react';
import Buttons from './Buton'; 
import './List.css'; 

const Todo = ({ id, task, handleDeleteTodo, handleUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [checked, setChecked] = useState(false);

  const handleSave = () => {
    handleUpdateTodo(id, updatedTask);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    handleDeleteTodo(id);
  };

  return (
    <div className="todo-card">
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>

      <div className="todo-text">
        {isEditing ? (
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
        ) : (
          <p>{task}</p>
        )}
      </div>

      <div className="todo-buttons">
        <Buttons
          isEditing={isEditing}
          onSave={handleSave}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Todo;
