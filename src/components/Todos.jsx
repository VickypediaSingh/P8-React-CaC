// APPROACH 1
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   updateTodo,
//   deleteTodo,
//   toggleComplete,
// } from "../features/todo/todoSlice";

// function Todos() {
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todos);
//   // state here means the initialState object, which had a todos arr inside of it.

//   const [isTodoEditable, setIsTodoEditable] = useState({});
//   const [todoMsg, setTodoMsg] = useState({});
//   // these both are objects (by default) as multiple todos can be set as editable at a time

//   const handleEditClick = (id) => {
//     setIsTodoEditable((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//     if (!isTodoEditable[id]) {
//       setTodoMsg((prev) => ({
//         ...prev,
//         [id]: todos.find((todo) => todo.id === id).text,
//       }));
//     } else {
//       dispatch(
//         updateTodo({
//           id,
//           text: todoMsg[id],
//         })
//       );
//     }
//   };

//   const handleToggleComplete = (id) => {
//     dispatch(toggleComplete(id));
//   };

//   const handleDeleteClick = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   return (
//     <>
//       <ul className="list-none space-y-4">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className={`flex justify-between items-center px-4 py-2 rounded shadow transition duration-300 ease-in-out ${
//               todo.completed
//                 ? "bg-green-400 hover:bg-green-600"
//                 : "bg-red-400 hover:bg-red-600"
//             }`}
//           >
//             <input
//               type="checkbox"
//               className="cursor-pointer mr-3"
//               checked={todo.completed}
//               onChange={() => handleToggleComplete(todo.id)}
//             />
//             <input
//               type="text"
//               className={`border outline-none w-full bg-transparent rounded-lg px-2 py-1 transition duration-300 ${
//                 isTodoEditable[todo.id]
//                   ? "border-gray-300"
//                   : "border-transparent"
//               } ${
//                 todo.completed ? "line-through text-gray-500" : "text-black"
//               }`}
//               value={todoMsg[todo.id] || todo.text}
//               onChange={(e) =>
//                 setTodoMsg({ ...todoMsg, [todo.id]: e.target.value })
//               }
//               readOnly={!isTodoEditable[todo.id]}
//             />
//             <button
//               className={`ml-3 inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center transition duration-300 ${
//                 todo.completed
//                   ? "bg-gray-400 text-gray-600 cursor-not-allowed"
//                   : "bg-gray-400 hover:bg-gray-100 text-gray-800"
//               }`}
//               onClick={() => handleEditClick(todo.id)}
//               disabled={todo.completed}
//             >
//               {isTodoEditable[todo.id] ? "💾" : "🖊️"}
//             </button>
//             <button
//               className="ml-3 inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center bg-red-500 hover:bg-yellow-400 text-white transition duration-300"
//               onClick={() => handleDeleteClick(todo.id)}
//             >
//               🗑️
//             </button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default Todos;

// APPROACH 2
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

  const [isTodoEditable, setIsTodoEditable] = useState({});
  // isTodoEditable is an object, for every todo clicked, it will store its editable status inside it as a key-value pair viz, {id:editableStatus} aese, so be careful, thats the reason why we will have to do todos.find to grab the right todo in toggleComplete named reducer in todoSlice.

  const [todoMsg, setTodoMsg] = useState({});
  // todoMsg is an object, for every todo clicked, it will store its msg inside it as a key-value pair viz, {id:msg} aese, so be careful , see line 188 + 2 .

  const handleEditClick = (id) => {
    // Check if the todo item is currently in edit mode
    const isCurrentlyEditable = isTodoEditable[id];

    // Toggle the edit mode for the todo item which will be found by [id]
    const updatedIsTodoEditable = {
      ...isTodoEditable,
      [id]: !isCurrentlyEditable,
    };
    setIsTodoEditable(updatedIsTodoEditable); //this line means
    // every todo item inside isTodoEditable big object will remain unchanged but the todo item with id = [id], its property named isCurrentlyEditable will be toggled

    // If the todo item is being made editable
    if (!isCurrentlyEditable) {
      //ye upar vala variable hai, ye isTodoEditable object se nhi aata...CAREFUL
      // Retrieve the current text of the todo item, ie. msg before editing
      const todoText = todos.find((todo) => todo.id === id).text;

      // Update the todo message state with the current text, ie. after editing
      setTodoMsg({ ...todoMsg, [id]: todoText });
    }
    // If the todo item is done editing
    // If the todo item is being saved
    else {
      // Dispatch an action to update the todo item with the new text
      dispatch(updateTodo({ id, text: todoMsg[id] }));
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
                ? "bg-green-300 hover:bg-green-600"
                : "bg-blue-300 hover:bg-blue-600"
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
                todo.completed
                  ? "line-through text-black font-bold"
                  : "text-black font-bold"
              }`}
              value={todoMsg[todo.id] || todo.text}
              onChange={(e) =>
                setTodoMsg({ ...todoMsg, [todo.id]: e.target.value })
              }
              // value and onChange descripton, 1st see onChange
              // onChange pe we saved it
              // so if we change, the changed value is shown from todoMsg object as it gets added in this object
              // if not changed, it shows value from todos arr (todo.text) as its an 'OR' but pehle from todoMsg
              readOnly={!isTodoEditable[todo.id]}
              // by default, todos are not editable (isTodoEditable) has no key-value pairs, implying all todos have a value of 'false' for edit mode). NHI HAI MEANS FALSE.
            />
            <button
              className={`ml-3 inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center transition duration-300 ${
                todo.completed
                  ? "bg-gray-500 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-yellow-500 text-gray-800"
              }`}
              onClick={() => handleEditClick(todo.id)}
              disabled={todo.completed}
            >
              {isTodoEditable[todo.id] ? "💾" : "🖊️"}
            </button>
            <button
              className="ml-3 inline-flex w-8 h-8 rounded-lg text-sm justify-center items-center bg-gray-100 hover:bg-red-700 text-white transition duration-300"
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
