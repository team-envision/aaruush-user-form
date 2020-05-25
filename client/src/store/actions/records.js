import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchRecords = () => {
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
        if (err) {
          console.log(err);
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
        if (err) {
          console.log(err);
        }
      });
  };
};
