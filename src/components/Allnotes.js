import React, { useState } from "react";
import "../styles/Allnotes.css";
import Card from "./Card";
import NoteModal from "./Note_Details";

const Allnotes = ({ notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleEdit = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  const handleDelete = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) return;

    if (noteToDelete.pinned) {
      // لو مثبتة → فك التثبيت بس
      setNotes(notes.map((note) =>
        note.id === id ? { ...note, pinned: false } : note
      ));
    } else {
      // لو مش مثبتة → احذفها
      setNotes(notes.filter((note) => note.id !== id));
    }
    handleCloseModal();
  };

  const handlePin = (id) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="all-notes-container">
      <h2>All Notes</h2>

      {notes.length === 0 ? (
        <p className="no-notes">No notes found. Try adding some!</p>
      ) : (
        <div className="notes-list">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              onClick={() => handleNoteClick(note)}
            >
              <Card
                title={note.title}
                content={
                  note.content.length > 100
                    ? note.content.substring(0, 100) + '...'
                    : note.content
                }
                date={note.date}
                pinned={note.pinned}
                className="custom-card"
              />
            </div>
          ))}
        </div>
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onDelete={() => handleDelete(selectedNote.id)}
          onPin={handlePin}
        />
      )}
    </div>
  );
};

export default Allnotes;