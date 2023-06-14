import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { fetchTaskCreate, fetchTaskDelete, fetchTaskList } from "../../repositories/TaskRepository";
import { listToMap } from "../handler/TaskHandler";
import { Task } from "../../types/Task";

enableMapSet();

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
      const task: Task = action.payload;
      const key: string = task.date;
      const taskArr: Task[] | undefined = state.tasks.get(key);

      if (taskArr) {
        taskArr.push(task);
        state.tasks.set(key, [...taskArr]);
      } else {
        state.tasks.set(key, [task]);
      }
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
    builder.addCase(fetchTaskDelete.fulfilled, (state, action) => {
      const task: Task = action.payload;
      const key: string = task.date;

      const oldTasks: Task[] = state.tasks.get(key) ?? [];
      const newTasks: Task[] = oldTasks.filter((t) => t.taskId !== task.taskId);

      if (newTasks.length === 0) {
        state.tasks.delete(key);
        return;
      }

      state.tasks.set(key, newTasks);
    });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
