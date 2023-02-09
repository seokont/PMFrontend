import React, { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { decrementPlayerId, fetchPlayers } from "../slices/players";
import { useDispatch, useSelector } from "react-redux";
import { sendMoneyStatus } from "../slices/players.js";
import ModalWindow from "../ui/ModalWindow";

const DecIncBalance = ({ open, setOpen, dataObj }) => {
  const statusMoney = useSelector(sendMoneyStatus);

  const [amountPlayer, setAmountPlayer] = useState(0);
  const [decIncPlayer, setDecIncPlayer] = useState("increment");
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const sendData = () => {
    dispatch(
      decrementPlayerId({
        id: dataObj._id,
        amount: amountPlayer,
        decInc: decIncPlayer,
      })
    );

    setOpen(false);
  };
  useEffect(() => {
    if (statusMoney === "loaded") {
      dispatch(fetchPlayers());
    }
  }, [dispatch, statusMoney]);

  const onChangeAmount = (e) => {
    setAmountPlayer(Number(e.target.value));
  };
  return (
    <>
      <ModalWindow
        sendData={sendData}
        handleClose={handleClose}
        open={open}
        title={"Change balance for"}
        player={dataObj?.player}
      >
        <p>Current balance: chips.</p>
        <p>In game: chips.</p>
        <p>In tournaments: chips. </p>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            onChange={onChangeAmount}
          />
        </Box>
        <RadioGroup
          onChange={(e) => {
            setDecIncPlayer(e.target.value);
          }}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={decIncPlayer}
          name="radio-buttons-group"
          style={{ display: "flex" }}
        >
          <FormControlLabel
            value="increment"
            control={<Radio />}
            label="Increment"
          />

          <FormControlLabel
            value="decrement"
            control={<Radio />}
            label="Decrement"
          />
        </RadioGroup>
      </ModalWindow>
    </>
  );
};
export default DecIncBalance;
