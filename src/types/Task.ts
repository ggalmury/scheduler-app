import { COLOR_TASK_1, COLOR_TASK_2, COLOR_TASK_3, COLOR_TASK_4, COLOR_TASK_5, COLOR_TASK_6, COLOR_TASK_7 } from "../utils/constants/Styles";

export interface TaskTimeDetail {
  hour: number;
  minute: number;
  period: string;
}

export interface TaskTime {
  startAt: TaskTimeDetail;
  endAt: TaskTimeDetail;
}

export interface Task {
  taskId: number;
  uuid: string;
  userName: string;
  email: string;
  title: string;
  description: string;
  color: TaskColorType;
  location: string;
  date: string;
  time: TaskTime;
  privacy: string;
  createdDt: Date;
  state: boolean;
}

export const TaskColor = {
  color1: COLOR_TASK_1,
  color2: COLOR_TASK_2,
  color3: COLOR_TASK_3,
  color4: COLOR_TASK_4,
  color5: COLOR_TASK_5,
  color6: COLOR_TASK_6,
  color7: COLOR_TASK_7,
} as const;

export type TaskColorType = (typeof TaskColor)[keyof typeof TaskColor];
