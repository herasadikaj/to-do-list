import React, { useEffect, useState } from 'react';
import AddTodo from './Add';  
import Todo from './Card';  
import './List.css'; 
import Widget from './Widget';
const TodoList = () => {
  const [todos, setTodos] = useState([]);  
  const [error, setError] = useState(null);  


  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);  
    } catch (err) {
      setError('Failed to fetch todos. Please try again.');
    }
  };

 
  useEffect(() => {
    fetchTodos();  
  }, []);  


  const addNewTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]); 
  };

  return (
    <div className="todo-list">
      <h1 className="title">TO DO LIST</h1>
      <AddTodo addNewTodo={addNewTodo} />

      {error && <p className="error">{error}</p>}
      <Widget todos={todos} /> 
      <div className="todo-container">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            
            fetchTodos={fetchTodos} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
