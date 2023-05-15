export interface Med {
  name: string;
  date: moment.Moment;
  isTaken: boolean;
}

export interface Diary {
  title: string;
  description: string;
  date: moment.Moment;
}

export interface Symptom {
  title: string;
  description: string;
  date: moment.Moment;
}

export interface Note {
  id: number;
  date: moment.Moment;
  meds: Med[];
  diary: Diary;
  symptom: Symptom;
}

export type NoteMap = Map<string, Note[]>;
