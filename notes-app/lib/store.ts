export type Note = { id: number; title: string; content: string };

export const store: { notes: Note[]; nextId: number } = {
  notes: [],
  nextId: 1,
};
