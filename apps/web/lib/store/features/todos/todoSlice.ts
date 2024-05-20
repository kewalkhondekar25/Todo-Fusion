import { createSlice } from "@reduxjs/toolkit";

type TodoType = {
  isAddTodoOpen: boolean
};

const initialState = {
  isAddTodoOpen: false
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openAddTodo: (state) => {
      state.isAddTodoOpen = !state.isAddTodoOpen
    }
  }
});
export const {openAddTodo} = todoSlice.actions;
export default todoSlice.reducer;