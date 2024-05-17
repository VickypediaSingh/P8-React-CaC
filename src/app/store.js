import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "../features/todo/todoSlice";
// "../features/todo/todoSlice" is sending todoSlice.reducer by default
// and we made it todoReducer

export const store = configureStore({
  reducer: todoReducer,
});
