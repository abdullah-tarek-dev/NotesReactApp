import React, { useState, useEffect } from 'react';
import '../styles/Show.css';
import Card from './Card';
import NoteModal from './Note_Details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Show = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  // تقسيم النوتس: المثبتة والي مضافة النهاردة
  const pinnedNotes = notes.filter(note => note.pinned);
  const todayNotes = notes.filter(note => {
    const today = new Date().toDateString();
    const noteDate = new Date(note.date).toDateString();
    return noteDate === today;
  });

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

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
    setSelectedNote(null); // إغلاق المودال
  };

  // const handleDelete = (id) => {
  //   const updatedNotes = notes.filter((note) => note.id !== id);
  //   setNotes(updatedNotes);
  //   localStorage.setItem('notes', JSON.stringify(updatedNotes));
  //   handleCloseModal();
  // };
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
    setSelectedNote(null); // عشان المودال يتقفل بعد التثبيت
  };

  return (
    <>
      <div className="show_container">
        {/* القسم الخاص بالنوت المثبتة */}
        <div className="pinned">
          <h2>Pinned</h2>
          <div className="pinned_class">
            {pinnedNotes.length === 0 ? (
              <p>No pinned notes.</p>
            ) : (
              pinnedNotes.map((note) => {
                const shortContent = note.content.length > 100 ? note.content.substring(0, 50) + '...' : note.content;
                return (
                  <div key={note.id} onClick={() => handleNoteClick(note)}>
                    <Card
                      title={note.title}
                      content={shortContent}
                      date={note.date}
                      className="show_card_style"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* القسم الخاص بنوت النهاردة */}
        <div className="today">
          <h2>Today</h2>
          <div className="today_class">
            {todayNotes.length === 0 ? (
              <p>No notes yet.</p>
            ) : (
              todayNotes.map((note) => {
                const shortContent = note.content.length > 100 ? note.content.substring(0, 50) + '...' : note.content;
                return (
                  <div key={note.id} onClick={() => handleNoteClick(note)}>
                    <Card
                      title={note.title}
                      content={shortContent}
                      date={note.date}
                      className="show_card_style"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* الفوتر */}
      <div className="footer">
        <Link to="/add" className="add">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        <Link to="/" className="Home">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>

      {/* المودال الخاص بالتفاصيل */}
      <NoteModal
        note={selectedNote}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={() => handleDelete(selectedNote.id)}
        onPin={handlePin}
      />
    </>
  );
};

export default Show;
