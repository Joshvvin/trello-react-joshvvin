import React, { useEffect, useState } from "react";
import "./Boards.css";
import Board from "./Board";
export default function DisplayBoards({ data, setBgimage, setBoardName }) {
  // console.log(data);
  return data.map((board) => {
    // console.log(board);
    let boardInfo = {
      name: board.name,
      id: board.id,
      bgcolor: board.prefs.backgroundColor,
      image: board.prefs.backgroundImage,
      setBoardName: setBoardName,
      setBgimage: setBgimage,
    };
    return <Board boardInfo={boardInfo} key={board.id} />;
  });
}
