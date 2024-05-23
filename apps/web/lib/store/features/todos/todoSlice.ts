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

type EditPayLoadType = {
  id: string,
  todo: string
}

type TodoType = {
  isAddTodoOpen: boolean;
  todos: AllTodosType[];
  todoCount: string,
  isTodoComplete: boolean,
  isEditTodoOpen: boolean,
  editPayload: EditPayLoadType | null
};

const initialState: TodoType = {
  isAddTodoOpen: false,
  todos: [],
  todoCount: "added",
  isTodoComplete: false,
  isEditTodoOpen: false,
  editPayload: null
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
    },
    setAddedTodoStatus: (state, action: PayloadAction<string>) => {
      state.todoCount = action.payload
    },
    setTodoComplete: (state, action: PayloadAction<boolean>) => {
      state.isTodoComplete = !state.isTodoComplete
    },
    ToggleEditTodo: (state) => {
      state.isEditTodoOpen = !state.isEditTodoOpen
    },
    setEditTodo: (state, action: PayloadAction<EditPayLoadType | null>) => {
      state.editPayload = action.payload
    }
  }
});
export const { 
  openAddTodo,
  setTodos, 
  setAddedTodoStatus, 
  setTodoComplete,
  ToggleEditTodo,
  setEditTodo
  
} = todoSlice.actions;

export default todoSlice.reducer;