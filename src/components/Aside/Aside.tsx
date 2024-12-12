import "../../styles/AsideComponents.css";

const Aside = ({ onGenreClick }) => {
  const genres = [
    {
      name: "Action",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJEcZWrSNB7i65QH7G2q-8dYJgkejpLYm84g&s",
    },
    {
      name: "Indie",
      img: "https://cdn5.f-cdn.com/contestentries/1785352/40217983/5f0490f020efa_thumbCard.jpg",
    },
    {
      name: "Adventure",
      img: "https://img.freepik.com/premium-vector/adventure-video-game-logo-template_23-2147834474.jpg",
    },
    {
      name: "RPG",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLG2WtfuFOnWqjWX2bKlFVHMsmvFbM9-9kAw&s",
    },
    {
      name: "Strategy",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRuSFe5xsuMelYPmwdNUxfuOtGTA_wQ5k9KQ&s",
    },
    {
      name: "Shooter",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi_-Ft0dF-AaSkhUfTBAqpM5Taa8WXT2SRzA&s",
    },
    {
      name: "Casual",
      img: "https://i.pinimg.com/474x/3b/9b/f5/3b9bf540623cb93866edf7715989dbf1.jpg",
    },
    {
      name: "Simulation",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkdlcQCZ691jOWysZqnzlTW4pBx63m6grBg&s",
    },
    {
      name: "Terror",
      img: "https://images-platform.99static.com//FGn_lt0_pyzp0-ovzavPyp3YU2U=/0x0:2000x2000/fit-in/500x500/projects-files/42/4297/429724/5a8477eb-c036-4989-aca1-cd2fa1b37bff.png",
    },
  ];

  return (
    <aside>
      <h3 className="title-aside">Genres</h3>
      <ul className="list-unstyled">
        {genres.map((genre) => (
          <li
            key={genre.name}
            className="pointer"
            onClick={() => onGenreClick(genre.name)}
          >
            <img className="img-category" src={genre.img} alt={genre.name} />
            {genre.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
