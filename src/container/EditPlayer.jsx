import React, { useEffect, useState } from "react";

import { fetchPlayers, editPlayerId } from "../slices/players";
import { useDispatch, useSelector } from "react-redux";
import { esditStatus } from "../slices/players.js";
import ModalWindow from "../ui/ModalWindow";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const EditPlayer = ({ open, setOpen, dataObj }) => {
  const dispatch = useDispatch();
  const statusEdit = useSelector(esditStatus);

  const [realNameState, setRealNameState] = useState(dataObj?.realName);
  const [locationState, setLocationState] = useState(dataObj?.location);
  const [emailState, setEmailState] = useState(dataObj?.email);

  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    dispatch(
      editPlayerId({
        id: dataObj?._id,
        player: dataObj?.player,
        realName: realNameState,
        email: emailState,
        location: locationState,
      })
    );
    setOpen(false);
    setTimeout(() => {
      dispatch(fetchPlayers());
    }, 1000);
  };

  useEffect(() => {
    if (statusEdit === "loaded") {
      dispatch(fetchPlayers());
    }
  }, [dispatch, statusEdit]);

  return (
    <>
      <ModalWindow
        handleClose={handleClose}
        sendData={sendData}
        open={open}
        title={"Edit"}
        player={dataObj?.player}
        nameButton="Edit"
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <p></p>
            <TextField
              id="outlined-number"
              label="Nickname"
              variant="filled"
              defaultValue={dataObj?.player}
              disabled
            />
            <p></p>
            <TextField
              id="outlined-disabled"
              label="Real Name"
              variant="filled"
              onChange={(e) => {
                setRealNameState(e.target.value);
              }}
              defaultValue={realNameState}
            />
            <p></p>
            <TextField
              id="outlined-disabled"
              label="Email"
              variant="filled"
              onChange={(e) => {
                setEmailState(e.target.value);
              }}
              defaultValue={emailState}
            />
            <p></p>
            <TextField
              id="outlined-basic"
              label="Location"
              variant="filled"
              onChange={(e) => {
                setLocationState(e.target.value);
              }}
              defaultValue={locationState}
            />
          </FormControl>
        </Box>
      </ModalWindow>
    </>
  );
};
export default EditPlayer;
