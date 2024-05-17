import { createSlice, nanoid } from "@reduxjs/toolkit";

// Initial state of the todos
const initialState = {
  todos: [
    // {
    //   id: 1,
    //   text: "Your toDo will look like this",
    //   completed: false, // Add completed status to initial state for consistency
    // },
  ],
};

// Create a slice for todos with the initial state and reducers
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Reducer to add a new todo
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(), // Generate a unique id for the new todo
        text: action.payload, // The text of the new todo comes from the action payload
        completed: false, // New todos are not completed by default
      };
      state.todos.push(todo); // Add the new todo to the state
    },

    // Reducer to update an existing todo
    updateTodo: (state, action) => {
      const { id, text } = action.payload; // Destructure id and text from the action payload
      const todo = state.todos.find((todo) => todo.id === id); // Find the todo by id
      if (todo) {
        todo.text = text; // Update the text of the found todo
      }
    },

    // Reducer to delete a todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Remove the todo with the specified id
    },

    // Reducer to toggle the completion status of a todo
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload); // Find the todo by id
      if (todo) {
        todo.completed = !todo.completed; // Toggle the completion status
      }
    },
  },
});

// Export the actions to be used in components
export const { addTodo, updateTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;

// Export the reducer to be used in the store
export default todoSlice.reducer;
