import { Platform } from "react-native";
import { Note, NoteMap } from "../types/Note";

export const isAndroid = (): boolean => {
  return Platform.OS === "android";
};

export const svgStructure = (size: number, viewbox: number, source: string): string => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 ${viewbox} ${viewbox}">
    ${source}
  </svg>`;
};

export const convertNoteListToMap = (noteList: Note[]): NoteMap => {
  const noteMap: NoteMap = new Map<string, Note[]>();

  noteList.forEach((note) => {
    const key: string = note.date.toString();
    noteMap.has(key) ? noteMap.get(key)!.push(note) : noteMap.set(key, [note]);
  });

  return noteMap;
};
