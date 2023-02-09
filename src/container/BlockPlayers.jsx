import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tables from "../components/Tables";
import ConnectedPlayers from "../components/ConnectedPlayers";
import Button from "@mui/material/Button";
import { updatePlayer, updateStatus, fetchPlayers } from "../slices/players";
import { useDispatch, useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BlockPlayers() {
  const statusUpdate = useSelector(updateStatus);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reloadButton = () => {
    dispatch(updatePlayer());
  };

  React.useEffect(() => {
    if (statusUpdate === "loaded") {
      dispatch(fetchPlayers());
    }
  }, [dispatch, statusUpdate]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Players" {...a11yProps(0)} />
          <Tab label="Connected Players" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Button
          variant="contained"
          onClick={reloadButton}
          style={{ marginBottom: "20px" }}
        >
          Reload
        </Button>
        <Tables />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConnectedPlayers />
      </TabPanel>
    </Box>
  );
}
