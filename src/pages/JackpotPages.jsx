import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJackpot,
  getJackpots,
  fetchEditJackpot,
  fetchCreateJackpot,
  fetchDeleteJackpot
} from "../slices/jackpot.js";
import {
  editJackpotRP,
  editJackpotA,
  editJackpotBJCheked,
  createJackpotBJCheked,
  createJackpotsstatus,
  deleteJackpotsstatus,
  editJackpotGamesArray
} from "../slices/jackpot.js";
import {getRingGames} from "../slices/ringGames"
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function JackpotPages() {
  const allJackpot = useSelector(getJackpots);
  const statusCreate = useSelector(createJackpotsstatus);
  const statusDelete = useSelector(deleteJackpotsstatus);
  const allRingGames = useSelector(getRingGames);
  console.log('allRingGamesallRingGames', )

  const arrayGames = React.useMemo(()=>{

    let ar =[];
    allRingGames?.array.forEach(element => {
      ar.push(element.Name)
    });
    return ar;
  },[allRingGames?.array])

  

  const dispatch = useDispatch();

  const [personName, setPersonName] = React.useState([]);

 

  React.useEffect(() => {
    dispatch(fetchJackpot());
  }, []);

  React.useEffect(() => {
    if (statusCreate === "loaded" || statusDelete === "loaded") {
      dispatch(fetchJackpot());
    }
  }, [dispatch, statusCreate, statusDelete]);

  const handleChangeRakePercent = (e, id) => {
    dispatch(editJackpotRP({ rake: e.target.value, id }));
    // const regex = /^[0-9\b]+$/;
    // if (e.target.value === "" || regex.test(e.target.value)) {
    // }
  };
  const handleChangeAmount = (e, id) => {
    dispatch(editJackpotA({ amount: e.target.value, id }));
    // const regex = /^[0-9\b]+$/;
    // if (e.target.value === "" || regex.test(e.target.value)) {
    // }
  };
  const handleChangeCheckbox = (e, id) => {
    dispatch(editJackpotBJCheked({ checked: e.target.checked ? 1 : 0, id }));
  };

  const handleChange = (event, id) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    dispatch(editJackpotGamesArray({games:typeof value === "string" ? value.split(",") : value, id}))


  };

  const newJackpot = () => {
    dispatch(createJackpotBJCheked());
  };

  const saveJackpot = (obj) => {    
    if ("505" === obj._id) {
      dispatch(fetchCreateJackpot(obj));
      dispatch(fetchJackpot());
    } else {
      dispatch(fetchEditJackpot(obj));
    }
  };
  const deleteJackot = (obj) => {
    dispatch(fetchDeleteJackpot(obj))
    dispatch(fetchJackpot());
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="success" disabled={allJackpot?.result.findIndex(i=>{
          return i._id === "505"
        }) !== -1} onClick={newJackpot}>
          Add New Jackpot
        </Button>
      </div>
      <div
        style={{
          marginTop: "15px",
          display: "grid",
          gap: "15px",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {allJackpot?.result.map((i, index) => (
          <Grid item key={i._id} xs={4}>
            <Item>
              <Box
                component="form"
                sx={{ display: "grid", "& > :not(style)": { m: 1 } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  label="Rake Percent"
                  type="number"
                  onChange={(e) => handleChangeRakePercent(e, i._id)}
                  value={i.rakePercent}
                />
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  label="Initial Amount"
                  value={i.initialAmount}
                  onChange={(e) => handleChangeAmount(e, i._id)}
                />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      saveJackpot(i);
                    }}
                  >
                    Save Jackpot
                  </Button>
                  <Button variant="contained" color="error" onClick={()=>{deleteJackot(i)}}>
                    Delete Jackpot
                  </Button>
                </div>

                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={!!i.badBeatJackpot}
                      onChange={(e) => handleChangeCheckbox(e, i._id)}
                    />
                  }
                  label="Badbeat Jackpot"
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Games</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={i?.games}
                    onChange={(e)=>handleChange(e,i._id)}
                    input={<OutlinedInput label="Games" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {arrayGames.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={i?.games.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  id="outlined-multiline-static"
                  label="PLAYER MSG"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                />
                <TextField
                  id="outlined-multiline-static"
                  label="TABLE MSG"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                />
              </Box>
            </Item>
          </Grid>
        ))}
      </div>
    </>
  );
}
