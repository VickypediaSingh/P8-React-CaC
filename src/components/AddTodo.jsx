import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState(""); // State to store the input value
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  const addTodoHandler = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the trimmed input value is empty
    if (input.trim() === "") return;

    dispatch(addTodo(input)); // Dispatch the action to add the todo
    setInput(""); // Clear the input field
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-5 mb-5">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-5 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input} // Bind the input value to the state
        onChange={(e) => setInput(e.target.value)} // Update the state on input change
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add a toDo
      </button>
    </form>
  );
}

export default AddTodo;
