import "../styles/App.scss";
import getDataApi from "../services/fetch.js";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });
  const [searchQuote, setSearchQuote] = useState("");
  const [searchCharacter, setSearchCharacter] = useState("");

  //fetch
  useEffect(() => {
    getDataApi().then((dataApi) => setData(dataApi));
  }, []);

  //New quote
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote,
      [ev.target.id]: ev.target.value,
    });
  };

  //Form validation
  const isValidForm = () => {
    if (newQuote.quote !== "" && newQuote.character !== "") {
      return true;
    } else {
      return false;
    }
  };

  //filter

  const handleSearchQuote = (ev) => {
    setSearchQuote(ev.target.value);
  };

  const handleSearchCharacter = (ev) => {
    setSearchCharacter(ev.target.value);
  };

  //Add new quote
  const handleAddNewQuote = (ev) => {
    ev.preventDefault();
    setData([...data, newQuote]);
    setNewQuote({
      quote: "",
      character: "",
    });
  };

  //render
  const htmlData = data

    .filter((eachQuote) =>
      eachQuote.quote.toLowerCase().includes(searchQuote.toLowerCase())
    )

    .filter((eachQuote) =>
      eachQuote.character.toLowerCase().includes(searchCharacter.toLowerCase())
    )

    .map((eachQuote, i) => {
      return (
        <li key={i}>
          <p>{eachQuote.quote}</p>
          <p>{eachQuote.character}</p>
        </li>
      );
    });

  return (
    <div>
      <header>
        <h1>Frases de Friends</h1>
        <form>
          <label htmlFor="searchQuote">Filtrar por frase:</label>
          <input
            type="searchQuote"
            name="searchQuote"
            id="searchQuote"
            value={searchQuote}
            onChange={handleSearchQuote}
          />
          <label htmlFor="searchCharacter">Filtrar por personaje:</label>
          <select
            name="searchCharacter"
            id="searchCharacter"
            value={searchCharacter}
            onChange={handleSearchCharacter}
          >
            <option value="">Todos</option>
            <option value="ross">Ross</option>
            <option value="monica">Monica</option>
            <option value="joey">Joey</option>
            <option value="phoebe">Phoebe</option>
            <option value="chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
        </form>
      </header>
      <main>
        <ul>{htmlData}</ul>
        <form>
          <h2>Añadir una nueva frase</h2>
          <label htmlFor="quote">Frase:</label>
          <input
            type="text"
            name="quote"
            id="quote"
            placeholder="Ejemplo: “See? He’s her lobster.”"
            required
            value={newQuote.quote}
            onChange={handleNewQuote}
          />
          <label htmlFor="character">Personaje:</label>
          <input
            type="text"
            name="character"
            id="character"
            placeholder="Ejemplo: Phoebe"
            required
            value={newQuote.character}
            onChange={handleNewQuote}
          />
          <input
            type="submit"
            value="Añadir nueva frase"
            onClick={handleAddNewQuote}
            disabled={isValidForm() === false}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
