import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { fetchNoteCreate, fetchNoteList } from "../../Repositories/NoteRepository";
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
  name: "diary",
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
        const note: Note = action.payload;
        const key: string = note.date.toString();
        const noteList: Note[] | undefined = state.note.get(key);

        if (noteList) {
          noteList.push(note);
          state.note.set(key, noteList);
        } else {
          state.note.set(key, [note]);
        }
      });
  },
});

export const {} = noteSlice.actions;
export default noteSlice.reducer;
