import { format } from "date-fns";
import { Task } from "../../types/Task";

export const listToMap = (tasks: Task[]): Map<string, Task[]> => {
  const taskMap: Map<string, Task[]> = new Map<string, Task[]>();

  tasks.forEach((task) => {
    const key: string = format(new Date(task.date), "yyyy-MM-dd");

    if (taskMap.has(key)) {
      taskMap.get(key)?.push(task);
    } else {
      taskMap.set(key, [task]);
    }
  });

  return taskMap;
};
