"use client";
import { useContext, useState, useEffect } from "react";
import { NotesContext } from "@/context/NotesContext";

export default function Home() {
  const { notes, setNotes } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/notes").then((r) => r.json()).then(setNotes);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const note = await res.json();
    setNotes((prev: any) => [...prev, note]);
    setTitle("");
    setContent("");
  }

  async function deleteNote(id: number) {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev: any) => prev.filter((n: any) => n.id !== id));
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <h1>Notes App</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 8, fontSize: 16, cursor: "pointer" }}>
          Add Note
        </button>
      </form>

      {notes.length === 0 && <p>No notes yet. Add one above!</p>}

      {notes.map((note: any) => (
        <div key={note.id} style={{ border: "1px solid #ccc", borderRadius: 6, padding: 12, marginBottom: 12 }}>
          <h3 style={{ margin: "0 0 4px" }}>{note.title}</h3>
          <p style={{ margin: "0 0 8px" }}>{note.content}</p>
          <button onClick={() => deleteNote(note.id)} style={{ cursor: "pointer", color: "red" }}>
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
