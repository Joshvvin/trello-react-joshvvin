import React from "react";
import "./Header.css";
import Trelloicon from "../../assets/Trello_logo.svg";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Container,
  Paper,
} from "@mui/material";
export default function Header({ setErrorState }) {
  function handleBoardsClick() {
    setErrorState("");
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className="header-container">
          <Link to="/boards" className="btn">
            <Button variant="contained" onClick={handleBoardsClick}>
              Boards
            </Button>
          </Link>
          <Container maxWidth="xs">
            <Paper
              className="icon-container"
              sx={{ width: "50%", height: "90%" }}
            >
              <img className="icon" src={Trelloicon} alt="trello-icon" />
            </Paper>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
