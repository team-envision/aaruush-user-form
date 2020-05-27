import axios from "axios";
import { createBrowserHistory } from "history";

import * as actionTypes from "./actionTypes";

export const fetchRecords = () => {
  let history = createBrowserHistory();

  return (dispatch) => {
    let token = localStorage.getItem("authToken");
    axios
      .get("/api/admin/records", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if ((res.data.status = "OK")) {
          dispatch(setRecords(res.data.data));
        }
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.error === "TokenExpiredError"
        ) {
          alert("Session Timeout. Please login again.");
          history.push("/admin/login");
        } else if (err.response.status === 401 || 403) {
          alert("NO TRESPASSING!");
          window.location.reload(false);
          history.push("/admin/login");
        } else if (err.response.status === 500) {
          alert("Internal Server Error");
          window.location.reload(false);
        }
      });
  };
};

export const setRecords = (records) => {
  return {
    type: actionTypes.SET_RECORDS,
    records: records,
  };
};

export const getReport = () => {
  let history = createBrowserHistory();

  return () => {
    let token = localStorage.getItem("authToken");
    axios
      .get("/api/admin/report", {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        console.log(res);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", res.headers["x-filename"]);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        if (
          err.response.status === 401 &&
          err.response.data.error === "TokenExpiredError"
        ) {
          alert("Session Timeout. Please login again.");
          history.push("/admin/login");
        } else if (err.response.status === 401 || 403) {
          alert("NO TRESPASSING!");
          history.push("/admin/login");
        } else if (err.response.status === 500) {
          alert("Internal Server Error");
          window.location.reload(false);
        }
      });
  };
};
