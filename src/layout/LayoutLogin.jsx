import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {selectIsAuth} from '../slices/auth'


const LayoutLogin = ({ children }) => {

  const isAuth = useSelector(selectIsAuth);

  //   if (isAuthenticated) {
  //   window.localStorage.setItem("token", currentUser);
  //   return <Navigate to="/dashboard" />;
  // } 
  
  return (
    <div style={{background: '#f4f4f4', width: '100%', height: '100vh'}}>
      <Box sx={{ flexGrow: 1, position:'fixed', width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
    
      <div style={{ maxWidth: "380px", width: "100%", background: '#fff' }}>{children}</div>
    </div>
    </div>
  );
};

export default LayoutLogin;
