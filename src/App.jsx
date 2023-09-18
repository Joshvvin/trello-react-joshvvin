import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import Header from "./components/Header";
// import Home from "./components/Home";
import Boards from "./components/Boards";

import BoardPage from "./components/Board-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [boardName, setBoardName] = useState("");
  const [bgimage, setBgimage] = useState("");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/boards"
          element={
            <Boards setBoardName={setBoardName} setBgimage={setBgimage} />
          }
        ></Route>
        <Route
          path="/boards/:id"
          element={<BoardPage boardName={boardName} bgimage={bgimage} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
