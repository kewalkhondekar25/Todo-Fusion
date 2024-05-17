import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type StatusType = "active" | "inactive" | "pending"

type CounterStateType = {
  count: number
  decision: StatusType
}

//initial state
const initialState: CounterStateType = {
  count: 0,
  decision: "pending"
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => {
      state.count += 1;
    },
    decrease: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.decision = action.payload;
    }
  }
})

//export functions
export const {increase, decrease, reset, setStatus} = counterSlice.actions

//export reducers functions
export default counterSlice.reducer