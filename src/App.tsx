import React, { useState } from "react";
import Aside from "./components/Aside/Aside";
import Header from "./components/Header/Header";
import ListGroup from "./components/ListGroup/ListGroup";
import "./styles/index.css";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [page, setPage] = useState(1);  // Adicionado o estado para a página

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);  // Certifique-se de que a busca volta para a primeira página
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.style.setProperty('--background', 'var(--background-light)');
      document.documentElement.style.setProperty('--secondaryBackground', 'var(--secondaryBackground-light)');
      document.documentElement.style.setProperty('--tertiaryBackground', 'var(--tertiaryBackground-light)');
      document.documentElement.style.setProperty('--text', 'var(--text-light)');
    } else {
      document.documentElement.style.setProperty('--background', 'var(--background-dark)');
      document.documentElement.style.setProperty('--secondaryBackground', 'var(--secondaryBackground-dark)');
      document.documentElement.style.setProperty('--tertiaryBackground', 'var(--tertiaryBackground-dark)');
      document.documentElement.style.setProperty('--text', 'var(--text-dark)');
    }
  };

  return (
    <>
      <Header onSearch={handleSearchChange} toggleTheme={toggleTheme} />
      <div className="d-flex">
        <Aside onGenreClick={handleGenreClick} />
        <ListGroup
          genre={selectedGenre}
          platforms={selectedPlatforms}
          searchTerm={searchQuery}
          onPlatformChange={handlePlatformChange}
          page={page}  // Passando a página atual como prop
          setPage={setPage}  // Passando a função setPage como prop
        />
      </div>
    </>
  );
}

export default App;
