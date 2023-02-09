import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ConnectedPlayers from "../components/ConnectedPlayers";
import Button from "@mui/material/Button";
import { updatePlayer, updateStatus, fetchPlayers } from "../slices/players";
import { useDispatch, useSelector } from "react-redux";
import TablesAffiliate from "../components/TablesAffiliate";
import {getAllAffiliates} from "../slices/affiliates"

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

export default function BlockAffiliate() {
  const statusUpdate = useSelector(updateStatus);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [openAddAffilii, setOpenAddAffilii] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(()=>{
    dispatch(getAllAffiliates())
  },[dispatch])

  const reloadButton = () => {
    dispatch(updatePlayer());
  };

  React.useEffect(() => {
    if (statusUpdate === "loaded") {
      dispatch(fetchPlayers());
    }
  }, [dispatch, statusUpdate]);
  const handleClickOpenAddAffilii = () => {
    setOpenAddAffilii(true)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Affiliates" {...a11yProps(0)} />
          <Tab label="Connected Players" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Button
          variant="contained"
          onClick={handleClickOpenAddAffilii}
          style={{ marginBottom: "20px" }}
        >
          Add Affiliate
        </Button>
        <Button
          variant="contained"
          onClick={reloadButton}
          style={{ marginBottom: "20px", marginLeft:"20px" }}
        >
          Reload
        </Button>
        <TablesAffiliate openAddAffilii={openAddAffilii} setOpenAddAffilii={setOpenAddAffilii}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConnectedPlayers />
      </TabPanel>
    </Box>
  );
}
