import { Task } from "../../types/Task";

export const listToMap = (tasks: Task[]): Map<string, Task[]> => {
  const taskMap: Map<string, Task[]> = new Map<string, Task[]>();

  tasks.forEach((task) => {
    const key: string = task.date.toString();

    if (taskMap.has(key)) {
      taskMap.get(key)?.push(task);
    } else {
      taskMap.set(key, [task]);
    }
  });

  return taskMap;
};
