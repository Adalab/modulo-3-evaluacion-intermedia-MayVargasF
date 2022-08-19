import "../styles/App.scss";
import quotes from "../data/quotes.json";
import { useState } from "react";

function App() {
  const [data, setData] = useState(quotes);
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });
  const [searchQuote, setSearchQuote] = useState("");

  //New quote
  const handleNewQuote = (ev) => {
    setNewQuote({
      ...newQuote,
      [ev.target.id]: ev.target.value,
    });
  };

  //filter

  const handleSearchQuote = (ev) => {
    setSearchQuote(ev.target.value);
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
            value={newQuote.quote}
            onChange={handleNewQuote}
          />
          <label htmlFor="character">Personaje:</label>
          <input
            type="text"
            name="character"
            id="character"
            placeholder="Ejemplo: Phoebe"
            value={newQuote.character}
            onChange={handleNewQuote}
          />
          <input
            type="submit"
            value="Añadir nueva frase"
            onClick={handleAddNewQuote}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
