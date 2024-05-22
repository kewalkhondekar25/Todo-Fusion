import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AllTodosType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  usersId: string;
}

type TodoType = {
  isAddTodoOpen: boolean
  todos: AllTodosType[] 
};

const initialState: TodoType = {
  isAddTodoOpen: false,
  todos: []
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openAddTodo: (state) => {
      state.isAddTodoOpen = !state.isAddTodoOpen
    },
    setTodos: (state, action: PayloadAction<AllTodosType[]>) => {
      state.todos = action.payload
    }
  }
});
export const { openAddTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;