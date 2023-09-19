import React, { useState } from "react";
import "./Board.css";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;
export default function Board(props) {
  const { boardInfo } = props;
  // console.log(boardInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopImmediatePropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let { name, id, bgcolor, image, setBoardName, setBgimage } = boardInfo;
  console.log(name, id, image, bgcolor);
  function handleBoardClick(event) {
    setBgimage(image);
    setBoardName(name);
  }
  return (
    <Link
      to={"/boards/" + id}
      style={{
        flexBasis: "18%",
        height: "20%",
      }}
      className="board-container"
      onClick={handleBoardClick}
    >
      <Paper
        style={{
          // background: { image === undefined ? bgcolor: null },
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
        <Typography variant="h5" sx={{ color: "black" }}>
          {name}
        </Typography>
      </Paper>
    </Link>
  );
}
