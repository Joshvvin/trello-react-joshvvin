import React, { useEffect, useState } from "react";
import "./List.css";
import { Link } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import Cards from "./Cards";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
import AddIcon from "@mui/icons-material/Add";
const apiKey = config.apiKey;
const token = config.token;
export default function List(props) {
  const { name, id } = props;
  // console.log(id);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [cardName, setCardName] = useState("");
  const [isCardAddVisible, setIsCardAddVisible] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleArchiveList() {
    const archivelisturl = `https://api.trello.com/1/lists/${id}/?closed=true&key=${apiKey}&token=${token}`;
    // console.log(archivelisturl);
    axios
      .put(archivelisturl)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
    handleClose();
  }
  function handleAddCardClick() {
    setIsCardAddVisible(true);
  }
  function handleCardNameChange(event) {
    setCardName(event.target.value);
  }
  function handleAddCard() {
    const addcardurl = `https://api.trello.com/1/cards?idList=${id}&name=${cardName}&key=${apiKey}&token=${token}`;
    axios
      .post(addcardurl)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }
  const [cards, setCards] = useState([]);
  const url = `https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${token}`;
  useEffect(() => {
    axios(url)
      .then((res) => {
        // console.log(res.data);
        setCards(res.data);
      })
      .catch(console.error);
  }, []);
  // console.log(name, cards);
  return (
    <div className="list">
      <Card
        className="list-card"
        style={{
          backgroundColor: "#F1F2F4",
          borderRadius: "20px",
          width: "100%",
          // height: "25%",
          // overflowY: "auto",
          // paddingLeft: "10px",
        }}
      >
        <CardContent>
          <div className="list-heading">
            <Typography variant="h6" sx={{ paddingLeft: "10px" }}>
              {name}
            </Typography>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleArchiveList}>Archive List</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="cards-container">
            {cards.map((card) => {
              // console.log(card);
              let cardInfo = {
                name: card.name,
                id: card.id,
                idCheckLists: card.idChecklists,
              };
              // console.log(cardInfo);
              return <Cards cardInfo={cardInfo} key={card.id} />;
            })}
          </div>
          {isCardAddVisible ? (
            <div className="addcard-contents">
              <input
                onChange={handleCardNameChange}
                placeholder="Enter a title for this card..."
              ></input>
              <button onClick={handleAddCard}>Add card</button>
            </div>
          ) : (
            <div className="addcard-container" onClick={handleAddCardClick}>
              <AddIcon />
              <Typography>Add a card</Typography>
            </div>
          )}

          {/* <Cards /> */}
        </CardContent>
      </Card>
    </div>
  );
}
