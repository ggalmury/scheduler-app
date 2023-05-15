import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { SERVERPATH } from "../utils/constant";
import { Note } from "../types/Note";

export const fetchNoteList = createAsyncThunk(`${SERVERPATH}/api/notelist`, async (): Promise<Note[]> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/api/notelist`);
  const noteList: Note[] = response.data;

  return noteList;
});

export const fetchNoteCreate = createAsyncThunk(`${SERVERPATH}/api/notecreate`, async (note: Note): Promise<Note> => {
  const response: AxiosResponse = await axios.post(`${SERVERPATH}/api/notecreate`, { note });
  const noteList: Note = response.data;

  return noteList;
});
