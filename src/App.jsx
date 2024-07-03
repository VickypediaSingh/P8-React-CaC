import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  // useEffect(() => {
  //   const todos = JSON.parse(localStorage.getItem("todos"));

  //   if (todos && todos.length > 0) {
  //     setTodos(todos);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);
  return (
    <>
      <h1>toDo App in Redux</h1>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;
