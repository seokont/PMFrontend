import React, { useEffect, useMemo, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {  fetchPlayers } from "../slices/players";
import {addAffiliates} from "../slices/affiliates"
import { useDispatch, useSelector } from "react-redux";
import { sendMoneyStatus, getPlayers } from "../slices/players.js";
import ModalWindow from "../ui/ModalWindow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddAffiliates = ({ open, setOpen, dataObj, handleClickOpenAddAffilii }) => {
  const statusMoney = useSelector(sendMoneyStatus);
  const playersData = useSelector(getPlayers);



  const [objectAll, setObjectAll] = useState({});

  console.log("objectAll",objectAll)

  const allPlayers = useMemo(() => {
    let arr = [];
    playersData?.arrayPlayers.forEach((element) => {
      arr.push(element.player);
    });
    return arr;
  }, [playersData?.arrayPlayers]);



  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    dispatch(
      addAffiliates(objectAll)
    );

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
        sendData={sendData}
        handleClose={handleClose}
        open={open}
        title={"Affiliate"}
        nameButton="Add Affiliate"
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, display: "grid", width: "95%" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Player</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={objectAll.player}
              label="Player"
              onChange={(e)=>{
                setObjectAll({...objectAll, player:e.target.value})
              }}
            >
              {allPlayers.map((i) => (
                <MenuItem value={i}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e)=>{
              setObjectAll({...objectAll, password:e.target.value})
            }}
          />
          <TextField
            id="outlined-basic"
            label="Percentage"
            variant="outlined"
            type="number"
            onChange={(e)=>{
              setObjectAll({...objectAll, percentage:Number(e.target.value)})
            }}
          />
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            onChange={(e)=>{
              setObjectAll({...objectAll, fullName:e.target.value})
            }}
          />
          <TextField
            id="outlined-basic"
            label="Code Invite"
            variant="outlined"
            onChange={(e)=>{
              setObjectAll({...objectAll, codeInvite:e.target.value})
            }}
          />
        </Box>
      </ModalWindow>
    </>
  );
};
export default AddAffiliates;
