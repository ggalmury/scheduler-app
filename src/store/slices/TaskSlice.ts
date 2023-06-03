import { createSlice } from "@reduxjs/toolkit";
import { fetchTaskCreate, fetchTaskList } from "../../repositories/TaskRepository";

interface InitialState {}

const initialState: InitialState = {};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskCreate.fulfilled, (state, action) => {
      //
    });
    builder.addCase(fetchTaskList.fulfilled, (state, action) => {
      console.log("fetch complete!");
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
