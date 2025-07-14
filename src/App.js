import React from 'react';
import './App.css';
import Home from './components/Home'
import Add from './components/Add';
// import Header from './components/Header';
// import Show from './components/Show';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Allnotes from './components/Allnotes';
// import NoteDetails from './components/Note_Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/all" element={<Allnotes />} />
        {/* <Route path="/note/:id" element={<NoteDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
