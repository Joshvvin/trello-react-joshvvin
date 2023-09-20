import React, { useEffect, useState } from "react";
import "./CheckItem.css";
import axios from "axios";
import config from "../../config";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Typography, IconButton, Menu, MenuItem } from "@mui/material";
export default function CheckItem(props) {
  const { checkitemobj, checkListId, checkItems, setCheckItems, idCard } =
    props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiKey = config.apiKey;
  const token = config.token;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleDeleteCheckitem() {
    const deletecheckitemurl = `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkitemobj.id}?key=${apiKey}&token=${token}`;
    axios
      .delete(deletecheckitemurl)
      .then((res) => {
        const newcheckitems = checkItems.filter(
          (citem) => citem.id != checkitemobj.id
        );
        setCheckItems(newcheckitems);
      })
      .catch(console.error);
  }
  function handleInputChange(checked, id) {
    const checkiteminputchangeurl = `https://api.trello.com/1/cards/${idCard}/checkItem/${id}?key=${apiKey}&token=${token}`;
    const data = {
      state: checked ? "complete" : "incomplete",
    };
    const updatedCheckItems = checkItems.map((citem) => {
      if (citem.id !== checkitemobj.id) {
        return citem;
      } else {
        const newcitem = { ...citem, state: data.state };
        return newcitem;
      }
    });

    // updateProgress();
    axios
      .put(checkiteminputchangeurl, data)
      .then(setCheckItems(updatedCheckItems))
      .catch(console.error);
  }
  return (
    <div className="checkitem">
      <input
        type="checkbox"
        id={checkitemobj.id}
        checked={
          checkItems.filter((citem) => citem.id === checkitemobj.id)[0]
            .state === "complete"
            ? true
            : false
        }
        className="checkitem-checkbox"
        onChange={(e) => {
          handleInputChange(e.target.checked, checkitemobj.id);
        }}
      />
      <Typography
        className={
          "checklist-item" +
          " " +
          checkItems.filter((citem) => citem.id === checkitemobj.id)[0].state
        }
      >
        {checkitemobj.name}
      </Typography>
      <div>
        <IconButton id="checkitem-horizicon" onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="checkitem-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDeleteCheckitem}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
