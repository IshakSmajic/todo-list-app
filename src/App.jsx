import { useState } from 'react'
import './App.css'
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id){
    setTodos(
      todos.map((todo) =>
      todo.id === id ? {...todo, completed: !todo.completed } : todo
    )
    );
  }
  function deleteTodo(id){
    setTodos(todos.filter((todo) => todo.id !==id));
  }

  return (
 <div>
<h1>Todo List</h1>
<TodoForm addTodo={addTodo}/>
<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
 </div>
  );
}

export default App
