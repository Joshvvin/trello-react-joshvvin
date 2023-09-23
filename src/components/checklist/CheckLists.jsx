import React, { useEffect, useState, useReducer } from "react";
import "./CheckLists.css";
import axios from "axios";
import config from "../../../config";
import CheckItem from "../checkitems/CheckItem";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { Checklist } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LinearProgress from "@mui/material/LinearProgress";
const apiKey = config.apiKey;
const token = config.token;
const reducer = (state, action) => {
  switch (action.type) {
    case "getCheckitems":
      return { checkItems: action.payload };
    case "addCheckitem":
      return { checkItems: [...state.checkItems, action.payload] };
    default:
      throw new Error();
  }
};
export default function CheckLists(props) {
  const { checkList, dispatchChecklists, allCheckLists } = props;
  // const [checkItems, setCheckItems] = useState([]);
  const [state, dispatchCheckitems] = useReducer(reducer, { checkItems: [] });
  const [isAddCheckItemVisible, setIsAddCheckItemVisible] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");
  const [progress, setProgress] = useState(0);
  const url = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?key=${apiKey}&token=${token}`;
  useEffect(() => {
    axios(url)
      .then((res) => {
        // setCheckItems(res.data);
        dispatchCheckitems({ type: "getCheckitems", payload: res.data });
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
        dispatchChecklists({ type: "removeChecklist", payload: newCheckLists });
        // console.log(res);
      })
      .catch(console.error);
  }
  function updateProgress() {
    let completedcheckitems = 0;
    state.checkItems.forEach((citem) => {
      if (citem.state === "complete") {
        completedcheckitems++;
      }
    });
    let percentage = Math.floor(
      (completedcheckitems / state.checkItems.length) * 100
    );
    if (percentage === NaN) {
      percentage = 0;
    }
    setProgress(
      state.checkItems.length === 0 ? state.checkItems.length : percentage
    );
  }
  useEffect(() => {
    updateProgress();
  }, [state.checkItems]);
  function handleCreateCheckitem() {
    const createcheckitemurl = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?name=${checkItemName}&key=${apiKey}&token=${token}`;
    axios
      .post(createcheckitemurl)
      .then((res) => {
        // setCheckItems((oldCheckItems) => [...oldCheckItems, res.data]);
        dispatchCheckitems({ type: "addCheckitem", payload: res.data });
      })
      .catch(console.error);
    setIsAddCheckItemVisible(false);
  }
  return (
    <>
      <Card className="checklists-cards" key={checkList.id}>
        <div className="checklist-header-container">
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
          <div className="checkitems-container">
            {state.checkItems !== undefined
              ? state.checkItems.map((checkItem) => {
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
                      checkItems={state.checkItems}
                      dispatchCheckitems={dispatchCheckitems}
                      idCard={checkList.idCard}
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
