import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import sliderReducer from "./features/slider/sliderSlice"
import checkReducer from "./features/checked/checkedSlice"
import addTodoReducer from "./features/todos/todoSlice"

//rtk nextjs setup
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      slider: sliderReducer,
      checked: checkReducer,
      todo: addTodoReducer
    }
  })
}



// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']