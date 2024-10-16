import React, { useState } from 'react';

const AddTodo = ({ addNewTodo }) => {
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');  
  const [error, setError] = useState(null);  
  

  const handleAddTodo = async () => {
    if (title.trim() !== '' && description.trim() !== '') {
      const newTodo = { title, description }; 
      try {
        const response = await fetch('http://localhost:8080/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        });

          if (!response.ok) {
          throw new Error('Failed to add todo');
        }

        const data = await response.json();
        addNewTodo(data);  
        setTitle(''); 
        setDescription('');
        setError(null); 
      } catch (err) {
        setError('Failed to add todo. Please try again.');
      }
    }
  };

  return (
    <div className="add-todo">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter todo title"/>
 
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter todo description"/>
      <button onClick={handleAddTodo}>Add To-Do</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddTodo;
