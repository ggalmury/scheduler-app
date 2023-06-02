import { createSlice } from "@reduxjs/toolkit";
import { fetchTaskCreate } from "../../repositories/TaskRepository";

interface InitialState {}

const initialState: InitialState = {};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskCreate.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
