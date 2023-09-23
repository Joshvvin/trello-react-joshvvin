import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import Header from "./components/header/Header";
import Boards from "./components/boards/Boards";
import { ErrorContext } from "./ErrorContext";
import BoardPage from "./components/boards/Board-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [boardName, setBoardName] = useState("");
  const [bgimage, setBgimage] = useState("");
  const [ErrorState, setErrorState] = useState("");
  return (
    <BrowserRouter>
      <ErrorContext.Provider value={ErrorState}>
        <Header setErrorState={setErrorState} />
        <Routes>
          <Route
            path="/boards"
            element={
              <Boards
                setBoardName={setBoardName}
                setErrorState={setErrorState}
                setBgimage={setBgimage}
              />
            }
          ></Route>
          <Route
            path="/boards/:id"
            element={
              <BoardPage
                boardName={boardName}
                setErrorState={setErrorState}
                bgimage={bgimage}
              />
            }
          ></Route>
        </Routes>
      </ErrorContext.Provider>
    </BrowserRouter>
  );
}

export default App;
