import React from "react";
import "./Header.css";
import Trelloicon from "../assets/Trello_logo.svg";
import { Link } from "react-router-dom";
import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Container,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
export default function Header() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className="header-container">
          <Link to="/boards" className="btn">
            <Button variant="contained">Boards</Button>
          </Link>
          <Container maxWidth="xs">
            <Paper
              className="icon-container"
              sx={{ width: "50%", height: "90%" }}
            >
              <img
                className="icon"
                src={Trelloicon}
                alt="trello-icon"
                // sx={{ height: "10%", widht: "" }}
              />
            </Paper>
            {/* <Typography variant="h4">Trello</Typography> */}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
