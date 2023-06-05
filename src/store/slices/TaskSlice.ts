import { createSlice } from "@reduxjs/toolkit";
import { fetchTaskCreate, fetchTaskList } from "../../repositories/TaskRepository";
import { listToMap } from "../handler/TaskHandler";
import { Task } from "../../types/Task";

interface InitialState {
  tasks: Map<string, Task[]>;
  isLoading: boolean;
}

const initialState: InitialState = {
  tasks: new Map<string, Task[]>(),
  isLoading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskCreate.fulfilled, (state, action) => {
      // implement
    });
    builder.addCase(fetchTaskList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTaskList.fulfilled, (state, action) => {
      const taskArr: Task[] = action.payload;
      const taskMap: Map<string, Task[]> = listToMap(taskArr);

      state.tasks = taskMap;
      state.isLoading = false;
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
