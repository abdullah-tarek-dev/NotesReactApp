import React, { useState } from 'react';
import '../styles/Show.css';
import Card from './Card';
import NoteModal from './Note_Details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Show = ({ notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const pinnedNotes = notes.filter((note) => note.pinned);
  const todayNotes = notes.filter((note) => {
    const today = new Date().toDateString();
    const noteDate = new Date(note.date).toDateString();
    return noteDate === today && !note.pinned;
  });

  const handleNoteClick = (note) => setSelectedNote(note);
  const handleCloseModal = () => setSelectedNote(null);

  const handleEdit = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setSelectedNote(null);
  };

  const handleDelete = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) return;

    if (noteToDelete.pinned) {
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, pinned: false } : note))
      );
    } else {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
    handleCloseModal();
  };

  const handlePin = (id) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, pinned: !note.pinned } : note))
    );
    setSelectedNote(null);
  };

  const renderCards = (list) =>
    list.map((note) => (
      <div key={note.id} className="card-wrapper" onClick={() => handleNoteClick(note)}>
        <Card
          title={note.title}
          content={note.content.length > 50 ? note.content.substring(0, 50) + '...' : note.content}
          date={note.date}
          pinned={note.pinned}
          className="show_card_style"
        />
      </div>
    ));

  return (
    <>
      <div className="show_container">

        <div className="section pinned">
          <h2>📌 Pinned</h2>
          <div className="cards_row">
            {pinnedNotes.length === 0
              ? <p className="empty-msg">No pinned notes.</p>
              : renderCards(pinnedNotes)
            }
          </div>
        </div>

        <div className="section today">
          <h2>Today</h2>
          <div className="cards_row">
            {todayNotes.length === 0
              ? <p className="empty-msg">No notes today.</p>
              : renderCards(todayNotes)
            }
          </div>
        </div>

      </div>

      <div className="footer">
        <Link to="/" className="footer-btn">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/add" className="footer-btn footer-btn--add">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onDelete={() => handleDelete(selectedNote.id)}
          onPin={handlePin}
        />
      )}
    </>
  );
};

export default Show;