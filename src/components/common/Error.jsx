import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./Error.css";

export default function Error(props) {
  const { name } = props;
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(name);
  return (
    <Snackbar
      className="error-container"
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert className="error" variant="filled" severity="error">
        {name}
      </Alert>
    </Snackbar>
  );
}
