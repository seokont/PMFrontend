import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers, deletePlayerId } from "../slices/players";
import { getPlayers } from "../slices/players";

// Generate Order Data
function createData(id, player, pRake, shipTo, paymentMethod, amount) {
  return { id, player, pRake, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function AllRake() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  const isData = useSelector(getPlayers);

  console.log(isData?.arrayPlayers);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Player</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Rake</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Net Win\Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isData?.arrayPlayers.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.player}</TableCell>
              <TableCell>{row.pRake}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="contained"
        onClick={preventDefault}
        style={{ marginTop: "35px" }}
      >
        Clear Rake
      </Button>
    </React.Fragment>
  );
}
