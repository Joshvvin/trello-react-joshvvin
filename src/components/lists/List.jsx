import React, { useEffect, useState, useContext, useReducer } from "react";
import "./List.css";
import config from "../../../config";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Error from "../common/Error";
import { ErrorContext } from "../../ErrorContext";
import {
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../common/Loader";
import DisplayListCards from "./DisplayListCards";
const apiKey = config.apiKey;
const token = config.token;
const reducer = (state, action) => {
  switch (action.type) {
    case "getCards":
      return { cards: action.payload };
    case "addCard":
      return { cards: [...state.cards, action.payload] };
    // case "deleteCard":
    //   return { cards: action.payload };
    default:
      throw new Error();
  }
};
export default function List(props) {
  const error = useContext(ErrorContext);
  const { name, id, dispatchLists, boardLists, setErrorState } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [cardName, setCardName] = useState("");
  const [state, dispatchCards] = useReducer(reducer, { cards: [] });
  const [isCardAddVisible, setIsCardAddVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const archivelisturl = `https://api.trello.com/1/lists/${id}/?closed=true&key=${apiKey}&token=${token}`;
  const addcardurl = `https://api.trello.com/1/cards?idList=${id}&name=${cardName}&key=${apiKey}&token=${token}`;
  const url = `https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${token}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleArchiveList() {
    axios
      .put(archivelisturl)
      .then((res) => {
        const newboardLists = boardLists.filter((blist) => {
          // console.log(blist);
          return blist.id != res.data.id ? true : false;
        });
        dispatchLists({ type: "archiveBoardList", payload: newboardLists });
      })
      .catch((err) => {
        setErrorState(`Failed to archive the list ${name}`);
      });
    handleClose();
  }

  function handleAddCardClick() {
    setIsCardAddVisible(true);
  }

  function handleCardNameChange(event) {
    setCardName(event.target.value);
  }

  function handleAddCard() {
    axios
      .post(addcardurl)
      .then((res) => {
        dispatchCards({ type: "addCard", payload: res.data });
      })
      .catch(console.error);
  }

  useEffect(() => {
    axios(url)
      .then((res) => {
        // console.log(res.data);
        dispatchCards({ type: "getCards", payload: res.data });
        // setCards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorState(`Failed to fetch the cards of the list ${name}`);
      });
  }, []);
  // console.log(name, cards);
  return (
    <ErrorContext.Provider value={error}>
      {error != "" ? (
        <Error name={error} />
      ) : (
        <div className="list">
          <Card
            className="list-card"
            style={{
              backgroundColor: "#F1F2F4",
              borderRadius: "20px",
              minWidth: "200px",
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
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleArchiveList}>
                      Archive List
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="cards-container">
                <DisplayListCards
                  cards={state.cards}
                  dispatchCards={dispatchCards}
                  setErrorState={setErrorState}
                />
              </div>
              {isCardAddVisible ? (
                <div className="addcard-contents">
                  <TextField
                    id="outlined-basic"
                    label="Enter a title for this card..."
                    variant="outlined"
                    className="card-name-input"
                    onChange={handleCardNameChange}
                  />
                  <Button
                    variant="contained"
                    className="add-card-button"
                    onClick={handleAddCard}
                  >
                    Add card
                  </Button>
                  <CloseIcon
                    className="close-add-card"
                    onClick={() => {
                      setIsCardAddVisible(false);
                    }}
                  />
                </div>
              ) : (
                <div className="addcard-container" onClick={handleAddCardClick}>
                  <AddIcon />
                  <Typography>Add a card</Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </ErrorContext.Provider>
  );
}
