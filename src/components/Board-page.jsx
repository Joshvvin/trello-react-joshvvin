import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Board-page.css";
import axios from "axios";
import List from "./List.jsx";
import config from "../../config";
import { Typography, Card, CardContent, Box, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const apiKey = config.apiKey;
const apiToken = config.token;

export default function BoardPage(props) {
  const { boardName, bgimage } = props;
  const { id } = useParams();
  const [isListAddVisible, setIsListAddVisible] = useState(false);
  const [boardLists, setBoardLists] = useState([]);
  const [listName, setListName] = useState("");

  const board_url = `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`;
  const createListUrl = `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${apiKey}&token=${apiToken}`;

  useEffect(() => {
    axios(board_url)
      .then((res) => {
        setBoardLists(res.data);
      })
      .catch(console.error);
  }, []);

  function handleAddList(event) {
    setIsListAddVisible(true);
  }

  function handleCreateList() {
    axios
      .post(createListUrl)
      .then((res) => {
        setBoardLists((oldBoardLists) => [...oldBoardLists, res.data]);
        // console.log(res);
      })
      .catch(console.error);
    setIsListAddVisible(false);
  }

  function handleListName(event) {
    setListName(event.target.value);
  }

  return (
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
        {boardLists.map((blist) => {
          return (
            <List
              name={blist.name}
              key={blist.id}
              id={blist.id}
              setBoardLists={setBoardLists}
              boardLists={boardLists}
            />
          );
        })}
        <div className="list">
          <Card
            className="list-card list-add-card"
            style={{ borderRadius: "20px" }}
          >
            <CardContent className="list-add">
              {isListAddVisible ? (
                <div className="list-add-items">
                  <input
                    placeholder="Enter list title..."
                    onChange={handleListName}
                  ></input>
                  <button onClick={handleCreateList}>Add List</button>
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
  );
}
