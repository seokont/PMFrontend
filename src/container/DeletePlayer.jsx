import React, { useEffect, useState } from "react";

import { fetchPlayers, deletePlayerId } from "../slices/players";
import { useDispatch, useSelector } from "react-redux";
import { deleteStatus } from "../slices/players.js";
import ModalWindow from "../ui/ModalWindow";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const DeletePlayer = ({ open, setOpen, dataObj }) => {
  const dispatch = useDispatch();
  const statusDelete = useSelector(deleteStatus);

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    dispatch(
      deletePlayerId({
        id: dataObj?._id,
        player: dataObj?.player,
      })
    );
    setOpen(false);
    setTimeout(() => {
      dispatch(fetchPlayers());
    }, 1000);
  };

  useEffect(() => {
    if (statusDelete === "loaded") {
      dispatch(fetchPlayers());
    }
  }, [dispatch, statusDelete]);

  return (
    <>
      <ModalWindow
        handleClose={handleClose}
        sendData={sendData}
        open={open}
        title={"Delete Player"}
        player={dataObj?.player}
        nameButton="Delete"
      ></ModalWindow>
    </>
  );
};
export default DeletePlayer;
