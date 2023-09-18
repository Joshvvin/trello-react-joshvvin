import React, { useEffect, useState } from "react";
import "./CheckItem.css";
import axios from "axios";
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
export default function CheckItem(props) {
  const { checkitemobj } = props;
  // console.log(checkitemobj);
  return (
    <>
      {/* <input type="checkbox" id=/> */}
      <Typography className="checklist-item">{checkitemobj.name}</Typography>
    </>
  );
}
