import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AllTodosType = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  usersId: string;
  priority?: string;
  minutes?: string;
  hours?: string;
  date?: Date;
  isUpcoming?: boolean;
}

type EditPayLoadType = {
  id: string,
  todo: string,
  priority: string,
  hours: string,
  minutes: string
}
type EditTodoValType = {
  id?: string
  todo?: string,
  priority?: string,
  hours?: string,
  minutes?: string
}

type UpcomingCardColorType = {
  date: string | undefined,
  color: string
}

type TodoType = {
  isAddTodoOpen: boolean;
  todos: AllTodosType[];
  todoCount: string,
  isTodoComplete: boolean,
  isEditTodoOpen: boolean,
  editPayload: EditPayLoadType | null,
  editValues: EditTodoValType | null,
  upcomingTodos: AllTodosType[],
  isOptionOpen: boolean,
  todayCardColor: string,
  UpcomingCardColor: UpcomingCardColorType[],
  UpcomingAllCmpltTodo: AllTodosType[],
  isPrioritySorted: boolean
  isTodayPrioritySorted: boolean
};

const initialState: TodoType = {
  isAddTodoOpen: false,
  todos: [],
  todoCount: "added",
  isTodoComplete: false,
  isEditTodoOpen: false,
  editPayload: null,
  editValues: null,
  upcomingTodos: [],
  isOptionOpen: false,
  todayCardColor: "C2D5C3",
  UpcomingCardColor: [],
  UpcomingAllCmpltTodo: [],
  isPrioritySorted: false,
  isTodayPrioritySorted: false
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
      state.isTodoComplete = !state.isTodoComplete;
    },
    ToggleEditTodo: (state) => {
      state.isEditTodoOpen = !state.isEditTodoOpen;
    },
    setEditTodo: (state, action: PayloadAction<EditPayLoadType | null>) => {
      state.editPayload = action.payload;
    },
    setEditValues: (state, action: PayloadAction<EditTodoValType>) => {
      state.editValues = action.payload;
    },
    setUpcomingTodos: (state, action: PayloadAction<AllTodosType[]>) => {
      state.upcomingTodos = action.payload
    },
    toggleCardOption: (state) => {
      state.isOptionOpen = !state.isOptionOpen;
    },
    setTodayCardColor: (state, action: PayloadAction<string>) => {
      state.todayCardColor = action.payload
    },
    setUpcomingCardColor: (state, action: PayloadAction<UpcomingCardColorType[]>) => {
      state.UpcomingCardColor= action.payload;
    },
    setUpcomingAllCmpltTodo: (state, action: PayloadAction<AllTodosType[]>) => {
      state.UpcomingAllCmpltTodo = action.payload;
    },
    setPrioritySort: (state) => {
      state.isPrioritySorted = !state.isPrioritySorted
    },
    setTodayPrioritySort: (state) => {
      state.isTodayPrioritySorted = !state.isTodayPrioritySorted
    }

  }
});
export const { 
  openAddTodo,
  setTodos, 
  setAddedTodoStatus, 
  setTodoComplete,
  ToggleEditTodo,
  setEditTodo,
  setEditValues,
  setUpcomingTodos,
  toggleCardOption,
  setTodayCardColor,
  setUpcomingCardColor,
  setUpcomingAllCmpltTodo,
  setPrioritySort,
  setTodayPrioritySort
} = todoSlice.actions;

export default todoSlice.reducer;