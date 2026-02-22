export type NoteData = { note: string; createdAt: string; updatedAt: string };
export type NoteStorages = {
  [key: string]: NoteData;
};