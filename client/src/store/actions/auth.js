import axios from "axios";
import * as actionTypes from "./actionTypes";

export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post("/api/admin/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.status === "OK") {
          dispatch(afterLogin());
          localStorage.setItem("authToken", res.data.authToken);
          console.log(localStorage.getItem("authToken"));
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.error === "Username or Password Wrong.") {
          alert("Invalid Credentials. Please try again.");
        }
      });
  };
};

export const afterLogin = () => {
  return {
    type: actionTypes.AFTER_LOGIN,
  };
};

export const checkLogin = () => {
  return {
    type: actionTypes.CHECK_LOGIN,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
