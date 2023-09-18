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
} from "@mui/material";
import { Checklist } from "@mui/icons-material";
const apiKey = config.apiKey;
const token = config.token;
export default function CheckLists(props) {
  const { checkListId } = props;
  //   const [checkListOpen, setCheckListOpen] = useState(false);
  const [checkListDetails, setCheckListDetails] = useState({});

  const url = `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${token}`;
  useEffect(() => {
    axios(url)
      .then((res) => {
        // console.log(res);
        setCheckListDetails(res.data);
        // setCards(res.data);
      })
      .catch(console.error);
  }, []);
  function handleChecklistDelete() {
    // console.log(checkListDetails.idCard, checkListId);
    const deletechecklisturl = `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${token}`;
    // console.log(deletechecklisturl);
    axios
      .delete(deletechecklisturl)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }
  // console.log(checkListDetails);
  return (
    <>
      <Card className="checklists-cards" key={checkListId}>
        {/* <button className="card-button" key={checkListId + " button"}> */}
        <CardContent className="checklist-details-container">
          <Typography
            id={checkListDetails.id}
            className="checklist-header"
            variant="h6"
          >
            {checkListDetails.name}
          </Typography>
          <button className="checklist-delete" onClick={handleChecklistDelete}>
            Delete
          </button>
          {/* {console.log(checkListDetails.checkItems)} */}
          <div className="checkitems-container">
            {checkListDetails.checkItems !== undefined
              ? checkListDetails.checkItems.map((checkItem) => {
                  const checkitemobj = {
                    name: checkItem.name,
                    id: checkItem.id,
                    state: checkItem.state,
                  };
                  return (
                    <CheckItem key={checkItem.id} checkitemobj={checkitemobj} />
                  );
                })
              : null}
          </div>
        </CardContent>
        {/* </button> */}
      </Card>
    </>
  );
}
