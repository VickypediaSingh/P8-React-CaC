import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "../features/todo/todoSlice";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // state here means the initialState object, which had a todos arr inside of it.

  const [isTodoEditable, setIsTodoEditable] = useState({});
  const [todoMsg, setTodoMsg] = useState({});
  // these both are objects (by default) as multiple todos can be set as editable at a time

  const handleEditClick = (id) => {
    setIsTodoEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (!isTodoEditable[id]) {
      setTodoMsg((prev) => ({
        ...prev,
        [id]: todos.find((todo) => todo.id === id).text,
      }));
    } else {
      dispatch(
        updateTodo({
          id,
          text: todoMsg[id],
        })
      );
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <ul className="list-none space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center px-4 py-2 rounded shadow transition duration-300 ease-in-out ${
              todo.completed
                ? "bg-green-100 hover:bg-green-200"
                : "bg-red-100 hover:bg-yellow-100"
            }`}
          >
            <input
              type="checkbox"
              className="cursor-pointer mr-3"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg px-2 py-1 transition duration-300 ${
                isTodoEditable[todo.id]
                  ? "border-gray-300"
                  : "border-transparent"
              } ${
                todo.completed ? "line-through text-gray-500" : "text-black"
              }`}
              value={todoMsg[todo.id] || todo.text}
              onChange={(e) =>
                setTodoMsg({ ...todoMsg, [todo.id]: e.target.value })
              }
              readOnly={!isTodoEditable[todo.id]}
            />
            <button
              className={`ml-3 inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center transition duration-300 ${
                todo.completed
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-800"
              }`}
              onClick={() => handleEditClick(todo.id)}
              disabled={todo.completed}
            >
              {isTodoEditable[todo.id] ? "💾" : "🖊️"}
            </button>
            <button
              className="ml-3 inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center bg-red-500 hover:bg-yellow-400 text-white transition duration-300"
              onClick={() => handleDeleteClick(todo.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
