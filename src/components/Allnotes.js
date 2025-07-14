import React, { useEffect, useState } from "react";
import "../styles/Allnotes.css";
import Card from "./Card"; 
import NoteModal from "./Note_Details";

const Allnotes = ({ onNoteClick }) => {
  const [notes, setNotes] = useState([]);
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
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  setSelectedNote(null); // لإغلاق المودال بعد التعديل
};

  const handleDelete = (id) => {
  const noteToDelete = notes.find(note => note.id === id);

  if (noteToDelete.pinned) {
    // لو مثبتة → فك التثبيت بس
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, pinned: false } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  } else {
    // لو مش مثبتة → نحذفها تمامًا
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  handleCloseModal();
};


const handlePin = (id) => {
  const updatedNotes = notes.map(note =>
    note.id === id ? { ...note, pinned: !note.pinned } : note
  );
  setNotes(updatedNotes);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
};


  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  return (
    <div className="all-notes-container">
      <h2>All Notes</h2>

      {notes.length === 0 ? (
        <p className="no-notes">No notes found. Try adding some!</p>
      ) : (
<div className="notes-list">
  {[...notes]
    .sort((a, b) => b.pinned - a.pinned) // ✅ فرز المثبتين بالأول
    .map((note) => (
      <div key={note.id} onClick={() => {
        if (onNoteClick) onNoteClick(note);
        handleNoteClick(note);    
      }}>
        <Card 
          title={note.title} 
          content={
            note.content.length > 100 
              ? note.content.substring(0, 100) + '...' 
              : note.content
          } 
          date={note.date}
          className="custom-card"
        />
      </div>
    ))}
</div>

      )}
                <NoteModal
        note={selectedNote}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={() => handleDelete(selectedNote.id)}
        onPin={handlePin}
      />
    </div>

  );
};

export default Allnotes;
