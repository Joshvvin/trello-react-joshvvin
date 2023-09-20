import React, { useEffect, useState } from "react";
import "./Cards.css";
import config from "../../config";
import CheckLists from "./CheckLists";
import axios from "axios";
import { Typography, Card, CardContent, Box, Modal, Menu } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "90%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textWrap: "wrap",
};
const apiKey = config.apiKey;
const token = config.token;
export default function Cards(props) {
  const { cardInfo, cards, setCards } = props;
  const { name, id } = cardInfo;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checklistName, setChecklistName] = useState("");
  const [allCheckLists, setAllCheckLists] = useState([]);
  const checklistopen = Boolean(anchorEl);
  const [loading, setLoading] = useState(true);

  const addchecklisturl = `https://api.trello.com/1/cards/${id}/checklists?name=${checklistName}&key=${apiKey}&token=${token}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCardOpen = () => {
    setOpen(true);
  };
  //   console.log(name, id);
  useEffect(() => {
    const getcardchecklistsurl = `https://api.trello.com/1/cards/${id}/checklists?key=${apiKey}&token=${token}`;
    // console.log(getcardchecklistsurl);
    axios(getcardchecklistsurl)
      .then((res) => {
        setAllCheckLists(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  const handleCardClose = () => setOpen(false);
  function handleCardDeleteClick(id) {
    const carddeleteurl = `https://api.trello.com/1/cards/${id}?key=${apiKey}&token=${token}`;
    // console.log(carddeleteurl);
    axios
      .delete(carddeleteurl)
      .then(() => {
        const newCards = cards.filter((card) => {
          return card.id != id ? true : false;
        });
        setCards(newCards);
      })
      .catch(console.error);
  }
  function handleChecklistNameChange(event) {
    setChecklistName(event.target.value);
  }
  function handleAddChecklist() {
    // console.log(addchecklisturl);
    axios
      .post(addchecklisturl)
      .then((res) => {
        setAllCheckLists((allCheckLists) => [...allCheckLists, res.data]);
        // console.log(res);
      })
      .catch(console.error);
    handleClose();
  }
  return loading ? (
    <Loader />
  ) : (
    <>
      <Card
        className="cards"
        style={{
          backgroundColor: "#FFF",
          borderRadius: "10px",
          width: "100%",
          height: "auto",
        }}
        key={id}
      >
        <button onClick={handleCardOpen} className="card-button">
          <CardContent
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            <Typography className="card-name">{name}</Typography>
          </CardContent>
        </button>
        <DeleteIcon onClick={() => handleCardDeleteClick(id)} />
      </Card>
      <Modal open={open} onClose={handleCardClose} key={id + "1"}>
        <Box sx={style} className="card-details-container">
          <div className="card-name-header">
            <CreditCardIcon className="card-name-icon" />
            <Typography variant="h5" className="card-name-container">
              {name}
            </Typography>
          </div>
          <div className="checklists-container">
            {allCheckLists.map((checklist) => {
              return (
                <CheckLists
                  checkList={checklist}
                  setAllCheckLists={setAllCheckLists}
                  allCheckLists={allCheckLists}
                  key={checklist.id}
                />
              );
            })}
          </div>
          <div className="add-to-card-container">
            <Typography>Add to card</Typography>
            <button
              className="checklist-button"
              id="demo-positioned-button"
              onClick={handleClick}
            >
              <ChecklistIcon />
              <Typography>CheckList</Typography>
            </button>
            <Menu
              id="demo-positioned-menu"
              anchorEl={anchorEl}
              open={checklistopen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Card className="checklist-add-container">
                <CardContent className="checklist-add-details">
                  <Typography>Add Checklist</Typography>
                  <label htmlFor="checklist-name"></label>
                  <input
                    id="checklist-name"
                    type="text"
                    onChange={handleChecklistNameChange}
                  />
                  <button onClick={handleAddChecklist}>Add</button>
                </CardContent>
              </Card>
            </Menu>
          </div>
        </Box>
      </Modal>
    </>
  );
}
