import { useState } from "react";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [current, setCurrent] = useState({ id: null, title: "", body: "" });
  const [search, setSearch] = useState("");


  function handleNew() {
    
    if (current.title.trim() || current.body.trim()) {
      if (current.id) {
        
        setNotes((prev) =>
          prev.map((n) => (n.id === current.id ? current : n))
        );
      } else {
      
        setNotes((prev) => [...prev, { ...current, id: Date.now() }]);
      }
    }
    
    setCurrent({ id: null, title: "", body: "" });
  }

  function selectNote(note) {
    setCurrent(note);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setCurrent({ id: null, title: "", body: "" });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Notes</h2>
          <button className="new-btn" onClick={handleNew}>+ New</button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <ul className="note-list">
  {notes.length === 0 ? (
    <p className="empty">No notes yet. Create one to get started!</p>
  ) : (
    notes
      .filter((note) =>
        (note.title + note.body)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map((note) => (
        <li
          key={note.id}
          onClick={() => selectNote(note)}
          className={current.id === note.id ? "active" : ""}
        >
          <div className="note-title">{note.title || "Untitled"}</div>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
            }}
          >
            ✕
          </button>
        </li>
      ))
  )}
</ul>

      </aside>

      <main className="editor">
        <input
          className="note-title-input"
          type="text"
          placeholder="Note title"
          value={current.title}
          onChange={(e) =>
            setCurrent({ ...current, title: e.target.value })
          }
        />
        <textarea
          className="note-body-input"
          placeholder="Write your note here..."
          value={current.body}
          onChange={(e) =>
            setCurrent({ ...current, body: e.target.value })
          }
        />
      </main>
    </div>
  );
}
