import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";


const ModalWindow = ({children, open, handleClose, title, player='', nameButton='Change balance', sendData}) => {
  return <>
   <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title} {player}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendData} autoFocus>
            {nameButton}
          </Button>
        </DialogActions>
      </Dialog>
  
  </>;
};

export default ModalWindow;
