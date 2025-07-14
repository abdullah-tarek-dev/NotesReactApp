import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Add.css';

const Add = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      const newNote = {
        id: Date.now(), // unique ID
        title,
        content,
          pinned: false,
  date: new Date()
      };

      setNotes([...notes, newNote]); // add to state
      setTitle('');
      setContent('');
      alert(`Note added: ${title}`);
 navigate('/');
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="add_container">
      <h2>New Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <textarea
          placeholder="Enter your Note"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default Add;
