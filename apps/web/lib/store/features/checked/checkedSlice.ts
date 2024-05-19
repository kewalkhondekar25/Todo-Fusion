import { createSlice } from "@reduxjs/toolkit";

type CheckedType = {
  isChecked: boolean
}
const initialState: CheckedType = {
  isChecked: false
}
const checkedSlice = createSlice({
  name: "checked",
  initialState,
  reducers: {
    check: (state) => {
      state.isChecked = !state.isChecked;
    }
  }
});

export const {check} = checkedSlice.actions;
export default checkedSlice.reducer;