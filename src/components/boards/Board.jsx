import React from "react";
import "./Board.css";
import { Link } from "react-router-dom";
import { Typography, Paper } from "@mui/material";

export default function Board(props) {
  const { boardInfo } = props;
  let { name, id, bgcolor, image, setBoardName, setBgimage } = boardInfo;
  function handleBoardClick(event) {
    setBgimage(image);
    setBoardName(name);
  }
  return (
    <Link
      to={"/boards/" + id}
      className="board-container"
      onClick={handleBoardClick}
    >
      <Paper
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundColor: `${bgcolor}`,
          backgroundPosition: "center",
          padding: "20px",
          textAlign: "start",
          flexBasis: "100%",
          height: "100%",
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          {name}
        </Typography>
      </Paper>
    </Link>
  );
}
