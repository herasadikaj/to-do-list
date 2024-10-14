import React, { useState } from 'react';
import Todo from './Card'; 
import './List.css'; 

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Buy milk' },
    { id: 2, task: 'Cook dinner' },
    { id: 3, task: 'Finish the task' },
    { id: 4, task:'Water the plants'},
  ]);

  const [newTask, setNewTask] = useState(''); 

  const handleAddTodo = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1, 
        task: newTask,
      };
      setTodos([...todos, newTodo]); 
      setNewTask(''); 
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (id, updatedTask) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, task: updatedTask } : todo
    ));
  };

  return (
    <div className="todo-list">
      <h1 className="title">TO DO LIST</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new to-do"
        />
        <button onClick={handleAddTodo}>Add To-Do</button>
      </div>

      
      <div className="todo-container">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
