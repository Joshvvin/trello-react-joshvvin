import React, { useEffect, useState } from "react";
import "./CheckLists.css";
import axios from "axios";
import config from "../../config";
import CheckItem from "./CheckItem";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Paper,
  Modal,
  TextField,
} from "@mui/material";
import { Checklist } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const apiKey = config.apiKey;
const token = config.token;
export default function CheckLists(props) {
  const { checkList, setAllCheckLists, allCheckLists } = props;
  const [checkItems, setCheckItems] = useState([]);
  const [isAddCheckItemVisible, setIsAddCheckItemVisible] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");
  const url = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?key=${apiKey}&token=${token}`;
  useEffect(() => {
    axios(url)
      .then((res) => {
        // console.log(res);
        setCheckItems(res.data);
        // setCards(res.data);
      })
      .catch(console.error);
  }, []);
  // console.log(checkList);
  function handleChecklistDelete() {
    // console.log(checkListDetails.idCard, checkListId);
    const deletechecklisturl = `https://api.trello.com/1/checklists/${checkList.id}?key=${apiKey}&token=${token}`;
    // console.log(deletechecklisturl);
    axios
      .delete(deletechecklisturl)
      .then((res) => {
        const newCheckLists = allCheckLists.filter((clist) => {
          return clist.id != checkList.id ? true : false;
        });
        setAllCheckLists(newCheckLists);
        // console.log(res);
      })
      .catch(console.error);
  }
  function handleCreateCheckitem() {
    const createcheckitemurl = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?name=${checkItemName}&key=${apiKey}&token=${token}`;
    axios
      .post(createcheckitemurl)
      .then((res) => {
        setCheckItems((oldCheckItems) => [...oldCheckItems, res.data]);
      })
      .catch(console.error);
    setIsAddCheckItemVisible(false);
  }
  return (
    <>
      <Card className="checklists-cards" key={checkList.id}>
        {/* <button className="card-button" key={checkListId + " button"}> */}
        <div className="checklist-header-container">
          {/* <CreditCardIcon /> */}
          <TaskAltIcon className="checklist-header-icon" />
          <Typography
            id={checkList.id}
            className="checklist-header"
            variant="h6"
          >
            {checkList.name}
          </Typography>
          <button className="checklist-delete" onClick={handleChecklistDelete}>
            Delete
          </button>
        </div>
        <CardContent className="checklist-progress-container"></CardContent>
        <CardContent className="checklist-details-container">
          {/* {console.log(checkListDetails.checkItems)} */}
          <div className="checkitems-container">
            {checkItems !== undefined
              ? checkItems.map((checkItem) => {
                  // console.log(checkItem);
                  const checkitemobj = {
                    name: checkItem.name,
                    id: checkItem.id,
                    state: checkItem.state,
                  };
                  return (
                    <CheckItem
                      key={checkItem.id}
                      checkitemobj={checkitemobj}
                      checkListId={checkList.id}
                      checkItems={checkItems}
                      setCheckItems={setCheckItems}
                      idCard={checkList.idCard}
                      // checkListDetails={checkListDetails}
                      // setCheckListDetails={setCheckListDetails}
                    />
                  );
                })
              : null}
          </div>
        </CardContent>
        <div className="checkitem-add-container">
          {isAddCheckItemVisible ? (
            <div className="add-checkitem-container">
              <TextField
                id="outlined-basic"
                label="Add an item"
                variant="outlined"
                className="checkitem-name"
                onChange={(event) => {
                  setCheckItemName(event.target.value);
                }}
              />
              <button
                className="add-checkitem-button"
                onClick={handleCreateCheckitem}
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsAddCheckItemVisible(true);
              }}
            >
              Add an item
            </button>
          )}
        </div>
      </Card>
    </>
  );
}
