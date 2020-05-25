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
          console.log(res.data);
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
