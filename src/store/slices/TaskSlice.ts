import { createSlice } from "@reduxjs/toolkit";
import { fetchTaskCreate, fetchTaskList } from "../../repositories/TaskRepository";
import { Task } from "react-native";

interface InitialState {
  // tasks: Map<string, Task[]>;
  // isLoading: boolean;
}

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
      //
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
