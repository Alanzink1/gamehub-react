import { useEffect, useState } from "react";
import "../../styles/index.css";
import "../../styles/ListGroup.css";
import MultiSelect from "./MultiSelect";
import Select from "./Select";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faPlaystation,
  faXbox,
  faApple,
  faLinux,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const platformIcons = {
  4: faWindows,
  187: faPlaystation,
  18: faPlaystation,
  16: faPlaystation,
  1: faXbox,
  186: faXbox,
  14: faXbox,
  3: faApple,
  5: faApple,
  6: faLinux,
  21: faAndroid,
};

const platformNames = {
  "PC": "4",
  "PlayStation": "18,187,16",
  "Xbox": "1,186,14",
  "iOS": "3",
  "macOS": "5",
  "Linux": "6",
  "Android": "21",
};

const ListGroup = ({ genre, platforms, onPlatformChange, searchTerm }) => {
  const API_KEY = "252987203b6542ed8e69ba8df26e7263";
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const genreLowerCase = genre ? genre.toLowerCase() : '';
        const platformQuery = platforms.map(p => platformNames[p]).join(',');
        const searchQuery = searchTerm ? `&search=${searchTerm}` : '';
        const sortQuery = sortOrder ? `&ordering=${sortOrder}` : '';
        const url = `https://api.rawg.io/api/games?key=${API_KEY}${genreLowerCase ? `&genres=${genreLowerCase}` : ''}${platformQuery ? `&platforms=${platformQuery}` : ''}${searchQuery}${sortQuery}&page=${page}`;

        console.log(`Fetching games from URL: ${url}`);
        const response = await axios.get(url);

        console.log("API Response:", response.data.results);

        if (response.data.results.length === 0) {
          console.log(`No games found`);
        } else {
          console.log(`Games found: ${response.data.results.length}`);
        }

        setGames(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 20)); // Ajuste baseado no número total de jogos
      } catch (error) {
        console.error("Erro ao carregar os jogos:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [genre, platforms, searchTerm, sortOrder, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setPage(1);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    window.scrollTo(0, 0);
  };

  const getPaginationItems = () => {
    const items = [];
    const siblingCount = 1;
    const totalVisiblePages = siblingCount * 2 + 3; // current + siblingCount * 2 + first + last + ...

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={page === i}
            className={page === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      items.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={page === 1 ? "active" : ""}
        >
          1
        </button>
      );

      if (page > siblingCount + 2) {
        items.push(<span key="start-ellipsis">...</span>);
      }

      const startPage = Math.max(page - siblingCount, 2);
      const endPage = Math.min(page + siblingCount, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={page === i}
            className={page === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      if (page < totalPages - siblingCount - 1) {
        items.push(<span key="end-ellipsis">...</span>);
      }

      items.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className={page === totalPages ? "active" : ""}
        >
          {totalPages}
        </button>
      );
    }

    return items;
  };

  if (loading) {
    return (
      <div className="container container-margin">
        <div className="d-flex flex-wrap gap-4 container-cards">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="card-placeholder">
              <div className="placeholder-img"></div>
              <div className="placeholder-text"></div>
              <div className="placeholder-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar os jogos: {error.message}</p>;
  }

  if (!games.length) {
    return <p>Nenhum jogo encontrado.</p>;
  }

  return (
    <div className="container container-margin">
      <h1 className="title-aside mb-4">Games</h1>
      <div className="container-selects d-flex gap-3 mb-2">
        <MultiSelect
          options={Object.keys(platformNames)}
          defaultOption="Select Platforms"
          onChange={onPlatformChange}
        />
        <Select
          options={[
            { label: "Relevância", value: "relevance" },
            { label: "Nome", value: "name" },
            { label: "Lançamento", value: "released" },
          ]}
          defaultOption="Ordenar por: Relevância"
          onChange={(value) => handleSortChange(value)}
        />
      </div>
      <div className="d-flex flex-wrap gap-4 container-cards">
        {games.map((game) => (
          <div key={game.id} className="card card-css border-0">
            <img className="card-img-top size-img" src={game.background_image} alt={game.name} />
            <div className="card-body card-css">
              {game.platforms.map((platform) => (
                <FontAwesomeIcon
                  key={platform.platform.id}
                  icon={platformIcons[platform.platform.id] || faQuestionCircle}
                  title={platform.platform.name}
                  style={{ margin: "0 5px" }}
                />
              ))}
              <h5 className="card-title text-white">{game.name}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {getPaginationItems()}
      </div>
    </div>
  );
};

export default ListGroup;
