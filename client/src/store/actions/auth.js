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
        }
      })
      .catch((err) => {
        if (err.response.data.error === "Username or Password Wrong!") {
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
