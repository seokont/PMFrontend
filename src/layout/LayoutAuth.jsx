import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "../components/listItems";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import { selectIsAuth, selectIsData } from "../slices/auth";
import { statusMessage } from "../slices/ringGames";
import { fetchRingGamesMessages, getRingGames } from "../slices/ringGames";
import { Navigate } from "react-router-dom";
import { fetchRingGames } from "../slices/ringGames";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © PMM "} {new Date().getFullYear()}
      {"."}
      <Link color="inherit" href="/">
        All rights reserved. Terms of use | Privacy Policy
      </Link>
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const LayoutAuth = ({ children }) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthData = useSelector(selectIsData);
  const dataRingGames = useSelector(getRingGames);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [ringGame, setNameRingGame] = React.useState("");
  const [messageTxt, setMessageTxt] = React.useState("");
  const [error, setError] = React.useState(undefined);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [open, setOpen] = React.useState(true);
  const statusM = useSelector(statusMessage);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  console.log(statusM);
  const sendMessage = () => {
    if (messageTxt) {
      dispatch(
        fetchRingGamesMessages({
          name: ringGame,
          message: messageTxt,
        })
      );
    } else {
      setError({ message: "blank" });
    }
  };
  React.useEffect(() => {
    if (statusM === "loaded") {
      setOpenModal(false);
      setNameRingGame("");
      setMessageTxt("")
      setError("")
    }
  }, [statusM]);

  React.useEffect(() => {
    dispatch(fetchRingGames());
  }, [dispatch]);

  const handleChange = (event) => {
    setNameRingGame(event.target.value);
  };

  const logoutDashboard = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard for Poker Mavens
            </Typography>
            <div style={{ padding: "0 5px" }}>
              <div>{isAuthData?.fullName}</div>
            </div>
            <Avatar alt="Remy Sharp" src={isAuthData?.avatarUrl} />
            <IconButton color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
            <Divider sx={{ my: 1 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={logoutDashboard}
            >
              Logout
            </div>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="full" sx={{ mt: 4, mb: 4 }}>
            {children}
            <Modal
              open={openModal}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select a ring game...
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ringGame}
                    label="Select a ring game..."
                    onChange={handleChange}
                  >
                    {dataRingGames?.array.map((i, index) => (
                      <MenuItem key={index} value={i.Name}>
                        {i.Name}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField
                  error={error && true}
                    style={{ marginTop: "15px" }}
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={4}
                    onChange={(e) => {
                      setMessageTxt(e.target.value);
                    }}
                  />

                  <Button
                    style={{ marginTop: "15px" }}
                    variant="contained"
                    onClick={sendMessage}
                  >
                    Send Message
                  </Button>
                </FormControl>
              </Box>
            </Modal>

            <Fab
              onClick={handleOpen}
              color="secondary"
              sx={{
                position: "absolute",
                bottom: (theme) => theme.spacing(2),
                right: (theme) => theme.spacing(2),
              }}
            >
              <ChatIcon />
            </Fab>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LayoutAuth;
