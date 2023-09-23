import React, { useState, useEffect, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import "./Board-page.css";
import axios from "axios";
import DisplayBoardLists from "./DisplayBoardLists";
import config from "../../../config";
import Error from "../common/Error";
import { ErrorContext } from "../../ErrorContext";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Paper,
  Button,
} from "@mui/material";
import Loader from "../common/Loader";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const apiKey = config.apiKey;
const apiToken = config.token;
const reducer = (state, action) => {
  switch (action.type) {
    case "getBoardLists":
      return { boardLists: action.payload };
    case "addBoardList":
      return { boardLists: [...state.boardLists, action.payload] };
    case "archiveBoardList":
      return { boardLists: action.payload };
  }
};
export default function BoardPage(props) {
  const error = useContext(ErrorContext);
  const { boardName, bgimage, setErrorState } = props;
  const { id } = useParams();
  const [isListAddVisible, setIsListAddVisible] = useState(false);
  const [state, dispatchLists] = useReducer(reducer, { boardLists: [] });
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(true);

  const board_url = `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`;
  const createListUrl = `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${apiKey}&token=${apiToken}`;

  useEffect(() => {
    axios(board_url)
      .then((res) => {
        dispatchLists({ type: "getBoardLists", payload: res.data });
        setLoading(false);
      })
      .catch((err) => {
        setErrorState(`Failed to fetch the lists of board ${boardName}`);
      });
  }, []);

  function handleAddList(event) {
    setIsListAddVisible(true);
  }
  function handleCreateList() {
    axios
      .post(createListUrl)
      .then((res) => {
        dispatchLists({ type: "addBoardList", payload: res.data });
      })
      .catch((err) => {
        setErrorState(`Failed to create a new list for board ${boardName}`);
      });
    setIsListAddVisible(false);
  }

  function handleListName(event) {
    setListName(event.target.value);
  }

  return (
    <ErrorContext.Provider value={error}>
      {error != "" ? (
        <Error name={error} />
      ) : loading ? (
        <Loader />
      ) : (
        <Paper
          style={{
            width: "100%",
            height: "92.94vh",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            backgroundImage: `url(${bgimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box className="board-heading-container" component="div">
            <Box className="board-heading" component="div">
              <Typography variant="h5">{boardName}</Typography>
            </Box>
          </Box>
          <Box className="board-lists" component="div">
            <DisplayBoardLists
              boardLists={state.boardLists}
              dispatchLists={dispatchLists}
              setErrorState={setErrorState}
            />
            <div className="list">
              <Card
                className="list-card list-add-card"
                style={{ borderRadius: "20px" }}
              >
                <CardContent className="list-add">
                  {isListAddVisible ? (
                    <div className="list-add-items">
                      <input
                        className="list-add-input"
                        placeholder="Enter list title..."
                        onChange={handleListName}
                      ></input>
                      <Button
                        className="list-add-button"
                        onClick={handleCreateList}
                        variant="contained"
                      >
                        Add List
                      </Button>
                      <CloseIcon
                        className="close-add-list"
                        onClick={() => {
                          setIsListAddVisible(false);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="list-add-start" onClick={handleAddList}>
                      <AddIcon />
                      <Typography sx={{ paddingLeft: "10px" }}>
                        Add another list
                      </Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Box>
        </Paper>
      )}
    </ErrorContext.Provider>
  );
}
