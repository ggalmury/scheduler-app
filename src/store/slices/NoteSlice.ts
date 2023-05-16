import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { fetchNoteCreate, fetchNoteDelete, fetchNoteList } from "../../repositories/NoteRepository";
import { Note, NoteMap } from "../../types/Note";
import { convertNoteListToMap } from "../../utils/helper";

enableMapSet();

interface InitialState {
  note: NoteMap;
  isLoading: boolean;
}

const initialState: InitialState = {
  note: new Map<string, Note[]>(),
  isLoading: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNoteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNoteList.rejected, () => {
        // TODO: implement error alert
      })
      .addCase(fetchNoteList.fulfilled, (state, action) => {
        const noteList: Note[] = action.payload;
        const noteMapTemp: NoteMap = convertNoteListToMap(noteList);

        state.note = noteMapTemp;
        state.isLoading = false;
      })
      .addCase(fetchNoteCreate.rejected, () => {
        // TODO: implement error alert
      })
      .addCase(fetchNoteCreate.fulfilled, (state, action) => {
        const createdNote: Note = action.payload;
        const key: string = createdNote.date.toString();
        const noteList: Note[] | undefined = state.note.get(key);

        if (noteList) {
          noteList.push(createdNote);
          state.note.set(key, noteList);
        } else {
          state.note.set(key, [createdNote]);
        }
      })
      .addCase(fetchNoteDelete.rejected, () => {
        // TODO: implement error alert
      })
      .addCase(fetchNoteDelete.fulfilled, (state, action) => {
        const deletedNote: Note = action.payload;
        const key: string = deletedNote.date.toString();

        const oldNotes: Note[] = state.note.get(key) ?? [];
        const newNotes: Note[] = oldNotes.filter((note) => note.id !== deletedNote.id);

        state.note.set(key, newNotes);
      });
  },
});

export const {} = noteSlice.actions;
export default noteSlice.reducer;
