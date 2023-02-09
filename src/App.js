import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutAuth from "./layout/LayoutAuth";
import LayoutLogin from "./layout/LayoutLogin";
import DashboardPages from "./pages/DashboardPages";
import Stats from "./pages/Stats";
import Players from "./pages/Players";
import LoginPages from "./pages/LoginPages";
import { fetchAuthMe, selectIsAuth } from "./slices/auth";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import JackpotPages from "./pages/JackpotPages";
import AffiliatePages from "./pages/AffiliatePages";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <LayoutAuth>
              <DashboardPages />
            </LayoutAuth>
          }
        />
        <Route
          path="/jackpot"
          element={
            <LayoutAuth>
              <JackpotPages />
            </LayoutAuth>
          }
        />
        <Route
          path="/stats"
          element={
            <LayoutAuth>
              <Stats />
            </LayoutAuth>
          }
        />
        <Route
          path="/players"
          element={
            <LayoutAuth>
              <Players />
            </LayoutAuth>
          }
        />

        <Route
          path="/affiliate"
          element={
            <LayoutAuth>
              <AffiliatePages />
            </LayoutAuth>
          }
        />

        <Route
          path="/"
          element={
            <LayoutLogin>
              <LoginPages />
            </LayoutLogin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
