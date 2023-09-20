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
import LinearProgress from "@mui/material/LinearProgress";
const apiKey = config.apiKey;
const token = config.token;
export default function CheckLists(props) {
  const { checkList, setAllCheckLists, allCheckLists } = props;
  const [checkItems, setCheckItems] = useState([]);
  const [isAddCheckItemVisible, setIsAddCheckItemVisible] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");
  const [progress, setProgress] = useState(0);
  const url = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?key=${apiKey}&token=${token}`;
  useEffect(() => {
    axios(url)
      .then((res) => {
        // console.log(res);
        setCheckItems(res.data);
        // setCards(res.data);
        // updateProgress();
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
  function updateProgress() {
    let completedcheckitems = 0;
    checkItems.forEach((citem) => {
      if (citem.state === "complete") {
        completedcheckitems++;
      }
    });
    // console.log(checkItems.length, completedcheckitems);
    const percentage = Math.floor(
      (completedcheckitems / checkItems.length) * 100
    );
    setProgress(percentage);
  }
  useEffect(() => {
    updateProgress();
  }, [checkItems]);
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
        <div className="checklist-progress-container">
          <div className="progress-percentage">{progress}%</div>
          <LinearProgress
            variant="determinate"
            className="progress-bar"
            value={progress}
          />
        </div>
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
                      // progress={progress}
                      // setProgress={setProgress}
                      // updateProgress={updateProgress}
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
              <Button
                variant="contained"
                className="add-checkitem-button"
                onClick={handleCreateCheckitem}
              >
                Add
              </Button>
              <button
                className="add-checkitem-close"
                onClick={() => {
                  setIsAddCheckItemVisible(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="checkitem-add-an-item-button"
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
