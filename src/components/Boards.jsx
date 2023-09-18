import React, { useEffect, useState } from "react";
import "./Boards.css";
import axios from "axios";
import Board from "./Board";
import config from "../../config";
import {
  Typography,
  Box,
  Paper,
  Menu,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
const apiKey = config.apiKey;
const apiToken = config.token;
const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`;
export default function Boards(props) {
  const { setBoardName, setBgimage } = props;
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [newBoardName, setNewBoardName] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => {
    const imageurl =
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/bc8cc08d6b08539640d2065f8f25d405/photo-1694250990115-ca7d9d991b24";
    const createurl = `https://api.trello.com/1/boards/?name=${newBoardName}&key=${apiKey}&token=${apiToken}`;
    // const newBoardData = {
    //   // name: newBoardName,
    //   prefs_background: imageurl,
    // };
    axios
      .post(createurl)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
    handleClose();
  };
  const handleInputChange = (event) => {
    setNewBoardName(event.target.value);
  };
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch(console.error);
  }, []);
  return (
    <Box className="boards-container" component="div">
      <Box className="boards" component="div">
        {
          <>
            <Paper
              className="createBoard"
              sx={{ backgroundColor: "#D6D6D6" }}
              // onClick={handleClick}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Typography variant="h5">Create new board</Typography>
            </Paper>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem className="menu-item">
                <Typography>Create New Board</Typography>
                <label htmlFor="board-title">Board title</label>
                <input
                  type="text"
                  className="board-title-input"
                  onChange={handleInputChange}
                ></input>
                <button onClick={handleCreate}>Create</button>
              </MenuItem>
            </Menu>
            {data.map((board) => {
              // console.log(board);
              let boardInfo = {
                name: board.name,
                id: board.id,
                bgcolor: board.prefs.background,
                image: board.prefs.backgroundImage,
                setBoardName: setBoardName,
                setBgimage: setBgimage,
              };
              // console.log(boardInfo);
              return <Board boardInfo={boardInfo} key={board.id} />;
            })}
          </>
        }
      </Box>
    </Box>
  );
}
