import React, { useEffect, useState } from "react";

import {  fetchPlayers } from "../slices/players";
import { useDispatch, useSelector } from "react-redux";
import { sendMoneyStatus } from "../slices/players.js";
import ModalWindow from "../ui/ModalWindow";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Affiliate = ({ open, setOpen, dataObj }) => {
  const statusMoney = useSelector(sendMoneyStatus);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (statusMoney === "loaded") {
      dispatch(fetchPlayers());
    }
  }, [dispatch, statusMoney]);

  return (
    <>
      <ModalWindow
        handleClose={handleClose}
        sendData={sendData}
        open={open}
        title={"Affiliate of"}
        player={dataObj?.player}
        nameButton="Assign new affiliate"
      >
        <p>This player is not affiliated. </p>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Affiliates</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Affiliates"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </ModalWindow>
    </>
  );
};
export default Affiliate;
