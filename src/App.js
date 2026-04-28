import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Allnotes from './components/Allnotes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/add" element={<Add notes={notes} setNotes={setNotes} />} />
        <Route path="/all" element={<Allnotes notes={notes} setNotes={setNotes} />} />
      </Routes>
    </Router>
  );
}

export default App;