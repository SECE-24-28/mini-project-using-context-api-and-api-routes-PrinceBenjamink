"use client";
import { createContext, useState } from "react";

export const NotesContext = createContext<any>(null);

export const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<any>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
