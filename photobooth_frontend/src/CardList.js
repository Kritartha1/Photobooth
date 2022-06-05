import React from "react";
import Card from "./Card/Card";

const CardList = ({ cards }) => {
  return (
    <div className="flex items-center">
      {cards.map((user, i) => {
        return (
          <Card
            key={i}
            ip={cards[i].ip}
            time={cards[i].time}
            date={cards[i].date}
            imageUrl={cards[i].imageUrl}
            filter={cards[i].filter}
          />
        );
      })}
    </div>
  );
};

export default CardList;
