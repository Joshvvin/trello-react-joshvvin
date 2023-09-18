import React, { useEffect, useState } from "react";
import "./Cards.css";
import config from "../../config";
import CheckLists from "./CheckLists";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Paper,
  Modal,
  Menu,
  MenuItem,
  cardActionAreaClasses,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistIcon from "@mui/icons-material/Checklist";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "90%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  //   gap: "50px",
  p: 4,
  textWrap: "wrap",
};
const apiKey = config.apiKey;
const token = config.token;
export default function Cards(props) {
  const { cardInfo } = props;
  const { name, id, idCheckLists } = cardInfo;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checklistName, setChecklistName] = useState("");
  const checklistopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCardOpen = () => {
    // console.log(idCheckLists);
    setOpen(true);
  };
  //   console.log(name, id);
  const handleCardClose = () => setOpen(false);
  function handleCardDeleteClick() {
    const carddeleteurl = `https://api.trello.com/1/cards/${id}?key=${apiKey}&token=${token}`;
    axios
      .delete(carddeleteurl)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }
  function handleChecklistNameChange(event) {
    setChecklistName(event.target.value);
  }
  function handleAddChecklist() {
    const addchecklisturl = `https://api.trello.com/1/cards/${id}/checklists?name=${checklistName}&key=${apiKey}&token=${token}`;
    // console.log(addchecklisturl);
    axios
      .post(addchecklisturl)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
    handleClose();
  }
  return (
    <>
      <Card
        className="cards"
        style={{
          backgroundColor: "#FFF",
          borderRadius: "10px",
          width: "100%",
          height: "auto",
          //   onClick: { handleCardOpen },
          // border: "1px solid black",
          // paddingLeft: "10px",
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
        <DeleteIcon onClick={handleCardDeleteClick} />
      </Card>
      <Modal open={open} onClose={handleCardClose} key={id + "1"}>
        <Box sx={style} className="card-details-container">
          <Typography variant="h4" className="card-name-container">
            {name}
          </Typography>
          {/* <button onClick={handleChecklistDelete}>Delete</button> */}
          <div className="checklists-container">
            {idCheckLists.map((checklistid) => {
              return <CheckLists checkListId={checklistid} key={checklistid} />;
            })}
          </div>
          <div className="add-to-card-container">
            <Typography>Add to card</Typography>
            <button
              className="checklist-button"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <ChecklistIcon />
              <Typography>CheckList</Typography>
            </button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
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
              {/* <MenuItem> */}
              <Card className="checklist-add-container">
                <CardContent className="checklist-add-details">
                  <Typography>Add Checklist</Typography>
                  <label htmlFor="checklist-name"></label>
                  <input
                    id="checklist-name"
                    type="text"
                    // placeholder="Checklist"
                    onChange={handleChecklistNameChange}
                  />
                  <button onClick={handleAddChecklist}>Add</button>
                </CardContent>
              </Card>
              {/* </MenuItem> */}
            </Menu>
          </div>
        </Box>
      </Modal>
    </>
  );
}
