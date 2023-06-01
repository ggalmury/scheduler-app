import { COLOR_TASK_1, COLOR_TASK_2, COLOR_TASK_3, COLOR_TASK_4 } from "../utils/constants/Styles";

export interface TaskTimeDetail {
  hour: number;
  minute: number;
}

export interface TaskTime {
  startAt: TaskTimeDetail;
  endAt: TaskTimeDetail;
}

export const TaskColor = {
  color1: COLOR_TASK_1,
  color2: COLOR_TASK_2,
  color3: COLOR_TASK_3,
  color4: COLOR_TASK_4,
} as const;

export type TaskColorType = (typeof TaskColor)[keyof typeof TaskColor];
