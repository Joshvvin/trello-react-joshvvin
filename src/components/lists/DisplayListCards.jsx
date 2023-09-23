import React from "react";
import Cards from "../cards/Cards";

export default function DisplayListCards({
  cards,
  dispatchCards,
  setErrorState,
}) {
  return cards.map((card) => {
    let cardInfo = {
      name: card.name,
      id: card.id,
    };
    return (
      <Cards
        cardInfo={cardInfo}
        key={card.id}
        cards={cards}
        dispatchCards={dispatchCards}
        setErrorState={setErrorState}
      />
    );
  });
}
