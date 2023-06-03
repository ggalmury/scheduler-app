import { Platform } from "react-native";
import moment from "moment";

export const isAndroid = (): boolean => {
  return Platform.OS === "android";
};

export const svgStructure = (size: number, viewbox: number, source: string): string => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 ${viewbox} ${viewbox}">
    ${source}
  </svg>`;
};

// export const convertNoteListToMap = (noteList: Note[]): NoteMap => {
//   const noteMap: NoteMap = new Map<string, Note[]>();

//   noteList.forEach((note) => {
//     const key: string = note.date.toString();
//     noteMap.has(key) ? noteMap.get(key)!.push(note) : noteMap.set(key, [note]);
//   });

//   return noteMap;
// };

export const dateToYMD = (moment: moment.Moment): string => {
  const formatted: string = moment.format("YYYY-MM-DD");
  return formatted;
};

export const validateEmail = (email: string): boolean => {
  const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};
