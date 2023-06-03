import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTaskList } from "../repositories/TaskRepository";
import { TaskListRequest } from "../types/Request";

export const useFetchTask = (standardDay: moment.Moment, deps?: any, condition?: boolean): void => {
  const dispatch = useDispatch();

  const [prevent, setPrevent] = useState<boolean | undefined>(condition);

  useEffect(() => {
    if (prevent) {
      setPrevent(false);
      return;
    }

    console.log("fetch data");
    const firstWeek: number = standardDay.clone().startOf("month").week();
    const lastWeek: number = standardDay.clone().endOf("month").week() === 1 ? 53 : standardDay.clone().endOf("month").week();

    const startOfWeek: Date = standardDay.clone().week(firstWeek).startOf("week").toDate();
    const endOfWeek: Date = standardDay.clone().week(lastWeek).endOf("week").toDate();

    const taskListRequest: TaskListRequest = { startOfWeek, endOfWeek };

    dispatch(fetchTaskList(taskListRequest) as any);
  }, [deps]);
};
