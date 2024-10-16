import React, { useState, useEffect } from 'react';
import Buttons from './Buton'; 
import './List.css'; 
import './Widget';
const Card = ({ id, title, description, isChecked: initialChecked, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedTitle, setUpdatedTitle] = useState(title); 
  const [updatedDescription, setUpdatedDescription] = useState(description); 
  const [isChecked, setIsChecked] = useState(initialChecked); 

  useEffect(() => {
    setUpdatedTitle(title);
    setUpdatedDescription(description);
    setIsChecked(initialChecked); 
  }, [title, description, initialChecked]);

  const toggleChecked = async () => {
    const newCheckedState = !isChecked;

    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isChecked: newCheckedState,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update checked status: ${response.status} - ${response.statusText}`);
      }

      setIsChecked(newCheckedState); 
    } catch (error) {
      console.error('Error updating checked status:', error.message);
    }
  };
  

  const saveTodo = async () => {
    console.log('Saving todo with ID:', id); 
    console.log('Updated Title:', updatedTitle); 
    console.log('Updated Description:', updatedDescription);
    
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          isChecked, 
        }),
      });
  
      if (!response.ok) {
        console.error(`Failed to save data: ${response.status} - ${response.statusText}`);
        throw new Error('Failed to save data');
      }
  
      const data = await response.json(); 
      console.log('Data saved successfully:', data); 
      setIsEditing(false); 
      fetchTodos(); 
    } catch (error) {
      console.error('Error updating todo:', error.message); 
    }
  };

  const editTodo = () => {
    console.log('Editing todo...'); 
    setIsEditing(true);
  };

  const cancelEdit = () => {
    console.log('Cancelling edit...');
    setUpdatedTitle(title); 
    setUpdatedDescription(description); 
    setIsEditing(false); 
  };

  const deleteTodo = async () => {
    console.log('Deleting todo...'); 
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTodos(); 
      } else {
        console.error('Failed to delete todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className={`todo-card ${isChecked ? 'checked' : ''}`}>
      <div className="todo-checkbox">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={toggleChecked} 
        />
      </div>

      <div className="todo-text">
        {isEditing ? (
          <div>
            <input 
              type="text" 
              value={updatedTitle} 
              onChange={(e) => setUpdatedTitle(e.target.value)} 
              placeholder="Task Title" 
            />
            <input 
              type="text" 
              value={updatedDescription} 
              onChange={(e) => setUpdatedDescription(e.target.value)}  
              placeholder="Task Description" 
            />
          </div>
        ) : (
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        )}
      </div>

      <div className="todo-buttons">
        <Buttons 
          isEditing={isEditing} 
          onSave={saveTodo} 
          onEdit={editTodo} 
          onDelete={deleteTodo} 
          onCancel={cancelEdit}
        />
      </div>
    </div>
  );
};

export default Card;
