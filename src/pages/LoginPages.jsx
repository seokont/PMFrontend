import React, { useEffect } from "react";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../slices/auth";
import { selectIsAuth } from "../slices/auth";
import { Navigate } from "react-router-dom";

const LoginPages = () => {
  const isAuth = useSelector(selectIsAuth);

  console.log("isAuthisAuth", isAuth);
  const dispatch = useDispatch();

  const onSubmitForm = async(values) => {
    const data = await dispatch(fetchAuth(values));
   if(!data.payload){
    return alert('Не удалось')
   }
   if('token' in data.payload){
     window.localStorage.setItem('token', data.payload.token)
   } 
  };

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={onSubmitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gap: "10px",
                textAlign: "left",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
                padding: "0px 10px 10px 10px",
                borderRadius: "4px",
              }}
            >
              <h1 style={{ textAlign: "center" }}>Poker Mavens Manager</h1>
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {/* <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          /> */}
              <div
                style={{ color: "red", fontSize: "12px", marginTop: "-10px" }}
              >
                {errors.email && touched.email && errors.email}
              </div>

              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {/* <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          /> */}
              {errors.password && touched.password && errors.password}

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                style={{ marginTop: "20px" }}
              >
                Send
              </Button>

              {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPages;
