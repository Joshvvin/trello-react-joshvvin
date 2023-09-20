import React, { useEffect, useState } from "react";
import "./Boards.css";
import axios from "axios";
import Board from "./Board";
import config from "../../config";
import { Typography, Box, Paper, Popover, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Loader from "./Loader";
import Stack from "@mui/material/Stack";
const apiKey = config.apiKey;
const apiToken = config.token;
const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`;
const style = {};
export default function Boards(props) {
  const { setBoardName, setBgimage } = props;
  const [data, setData] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);

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

    axios
      .post(createurl)
      .then((res) => {
        setData((oldData) => [...oldData, res.data]);
        // console.log(res);
      })
      .catch(console.error);

    // setNewBoardName("");
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
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  return (
    <Box className="boards-container" component="div">
      {loading ? (
        // <Stack spacing={1}>
        <Loader />
      ) : (
        // </div>
        // </Stack>
        <Box className="boards" component="div">
          {
            <>
              <Paper
                className="createBoard"
                sx={{ backgroundColor: "#D6D6D6" }}
                onClick={handleClick}
              >
                <Typography variant="h5">Create new board</Typography>
              </Paper>
              <Popover
                id="modal-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
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
                <div className="create-board-container">
                  <Typography variant="h6" className="create-board-header">
                    Create New Board
                  </Typography>
                  <div className="board-title-container">
                    <label htmlFor="board-title">Board title</label>
                    <input
                      type="text"
                      id="board-title"
                      className="board-title-input"
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <button
                    className="create-board-button"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>
              </Popover>
              {
                // loaded ? (
                data.map((board) => {
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
                })
                // )
                // :
                // (
                //   <Stack spacing={1}>
                //     {data.map((board) => {
                //       return (
                //         <Skeleton
                //           variant="rounded"
                //           className="board-container"
                //           key={board.name}
                //         />
                //       );
                //     })}
                //   </Stack>
                // )
              }
            </>
          }
        </Box>
      )}
    </Box>
  );
}
