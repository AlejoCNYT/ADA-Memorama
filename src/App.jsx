import { useEffect, useState } from "react";
import { generateCardPairs } from "./utils/generateCardPairs";

function App() {
  // Estado principal
  const [cards, setCards] = useState(generateCardPairs());
  const [selectedCards, setSelectedCards] = useState([]); // índices

  // Click en carta
  const handleCardClick = (cardIndex) => {
    const card = cards[cardIndex];
    if (card.flipped || card.matched) return;      // no tocar si ya está visible o emparejada
    if (selectedCards.length === 2) return;        // evita seleccionar 3

    const updated = [...cards];
    updated[cardIndex] = { ...updated[cardIndex], flipped: true };
    setCards(updated);
    setSelectedCards((prev) => [...prev, cardIndex]);
  };

  // Resolver pareja al haber 2 seleccionadas
  useEffect(() => {
    if (selectedCards.length !== 2) return;

    const [a, b] = selectedCards;
    const copy = [...cards];

    if (copy[a].value === copy[b].value) {
      copy[a] = { ...copy[a], matched: true };
      copy[b] = { ...copy[b], matched: true };
      setCards(copy);
      setSelectedCards([]);
    } else {
      setTimeout(() => {
        const cpy = [...copy];
        cpy[a] = { ...cpy[a], flipped: false };
        cpy[b] = { ...cpy[b], flipped: false };
        setCards(cpy);
        setSelectedCards([]);
      }, 500);
    }
  }, [selectedCards, cards]);

  // Ganaste
  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      window.alert("¡Has ganado! / You won!");
    }
  }, [cards]);

  return (
    <div className="container-cards">
      {cards.map((card, index) => (
        <button
          key={card.id ?? index}
          className="card"
          onClick={() => handleCardClick(index)}
          style={{
            backgroundColor: (card.flipped || card.matched) ? "white" : "gray",
          }}
        >
          {(card.flipped || card.matched) ? String(card.value) : null}
        </button>
      ))}
    </div>
  );
}

export default App;
export { App };
