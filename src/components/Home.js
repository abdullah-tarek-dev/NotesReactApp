import { useState } from "react";
import Header from "../components/Header";
import Show from "../components/Show";
import "../styles/Home.css";

const Home = ({ notes, setNotes }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-wrapper">
      <Header onSearch={setSearchQuery} />
      <main className="home-main">
        <Show notes={filteredNotes} setNotes={setNotes} />
      </main>
    </div>
  );
};

export default Home;