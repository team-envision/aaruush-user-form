import axios from "axios";
import { createBrowserHistory } from "history";

import * as actionTypes from "./actionTypes";

export const login = (username, password) => {
  let history = createBrowserHistory();

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
          history.push("/admin/records");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert("Invalid Credentials. Please try again.");
        } else if (err.response.status === 500) {
          alert("Try again after some time");
          history.goBack();
        } else if (err.response.status === 400) {
          alert("Missing Parameters");
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
