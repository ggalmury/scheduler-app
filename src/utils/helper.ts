import { Note, NoteMap } from "../types/Note";

export const convertNoteListToMap = (noteList: Note[]): NoteMap => {
  const noteMap: NoteMap = new Map<string, Note[]>();

  noteList.forEach((note) => {
    const key: string = note.date.toString();
    noteMap.has(key) ? noteMap.get(key)!.push(note) : noteMap.set(key, [note]);
  });

  return noteMap;
};
