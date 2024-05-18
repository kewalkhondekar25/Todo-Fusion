import { createSlice } from "@reduxjs/toolkit";

type ToggleType = {
  isToggle: boolean
}

const initialState: ToggleType = {
  isToggle: false
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isToggle = !state.isToggle
    }
  }
});

export const {toggle} = sliderSlice.actions;
export default sliderSlice.reducer;