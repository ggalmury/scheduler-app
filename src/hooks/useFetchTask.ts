import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTaskList } from "../repositories/TaskRepository";

export const useFetchTask = (standardDay: Date, deps?: any, condition?: boolean): void => {
  const dispatch = useDispatch();

  const [prevent, setPrevent] = useState<boolean | undefined>(condition);

  useEffect(() => {
    if (prevent) {
      setPrevent(false);
      return;
    }
    // fix fetching logic

    dispatch(fetchTaskList() as any);
  }, [deps]);
};
