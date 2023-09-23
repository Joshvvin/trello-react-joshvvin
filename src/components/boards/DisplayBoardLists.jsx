import React from "react";
import "./Board-page.css";
import List from "../lists/List.jsx";

export default function DisplayBoardLists({
  boardLists,
  dispatchLists,
  setErrorState,
}) {
  return boardLists.map((blist) => {
    return (
      <List
        name={blist.name}
        key={blist.id}
        id={blist.id}
        dispatchLists={dispatchLists}
        boardLists={boardLists}
        setErrorState={setErrorState}
      />
    );
  });
}
