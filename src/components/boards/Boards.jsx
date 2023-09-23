import React, { useEffect, useState, useContext, useReducer } from "react";
import axios from "axios";
import DisplayBoards from "./DisplayBoards";
import config from "../../../config";
import { Typography, Box, Paper, Popover } from "@mui/material";
import Loader from "../common/Loader";
import { ErrorContext } from "../../ErrorContext";
import Error from "../common/Error";
const apiKey = config.apiKey;
const apiToken = config.token;
const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`;
// const style = {};
const reducer = (state, action) => {
  switch (action.type) {
    case "getBoards":
      return { data: action.payload };
    case "AddBoard":
      return { data: [...state.data, action.payload] };
    default:
      throw new Error("action type is not defined");
  }
};
export default function Boards(props) {
  const error = useContext(ErrorContext);
  const { setBoardName, setBgimage, setErrorState } = props;
  const [newBoardName, setNewBoardName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, dispatchData] = useReducer(reducer, { data: [] });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCreate = () => {
    const createurl = `https://api.trello.com/1/boards/?name=${newBoardName}&key=${apiKey}&token=${apiToken}`;
    axios
      .post(createurl)
      .then((res) => {
        // setData((oldData) => [...oldData, res.data]);
        dispatchData({ type: "AddBoard", payload: res.data });
      })
      .catch((err) => {
        setErrorState("Failed to create new Board");
      });

    handleClose();
  };
  const handleInputChange = (event) => {
    setNewBoardName(event.target.value);
  };
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        dispatchData({ type: "getBoards", payload: res.data });
        // console.log(state.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorState("Failed to fetch the boards");
      });
  }, []);
  return (
    <ErrorContext.Provider value={error}>
      <Box className="boards-container" component="div">
        {error != "" ? (
          <Error name={error} />
        ) : loading ? (
          <Loader />
        ) : (
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
                <DisplayBoards
                  data={state.data}
                  setBgimage={setBgimage}
                  setBoardName={setBoardName}
                />
              </>
            }
          </Box>
        )}
      </Box>
    </ErrorContext.Provider>
  );
}
