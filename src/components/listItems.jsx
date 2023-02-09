import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <NavLink
      to="/dashboard"
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>

        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>
    <NavLink
      to="/stats"
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>

        <ListItemText primary="Stats" />
      </ListItemButton>
    </NavLink>

    <NavLink
      to="/players"
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Players" />
      </ListItemButton>
    </NavLink>

    <NavLink
      to="/affiliate"
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
    >
    <ListItemButton>
      <ListItemIcon>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primary="Affiliates" />
    </ListItemButton>
    </NavLink>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Hands History" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Logs" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Config" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Jackpot
    </ListSubheader>

    <NavLink
      to="/jackpot"
      style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Jackpots" />
      </ListItemButton>
    </NavLink>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="History (P)" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="History (BB)" />
    </ListItemButton>
  </React.Fragment>
);
