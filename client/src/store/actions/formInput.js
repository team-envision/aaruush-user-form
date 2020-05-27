import axios from "axios";
import { createBrowserHistory } from "history";

import * as actionTypes from "./actionTypes";

let history = createBrowserHistory();

export const submitForm = (data) => {
  return (dispatch) => {
    let finalData = new FormData();
    finalData.append("name", data.name);
    finalData.append("city", data.city);
    finalData.append("message", data.message);
    finalData.append("attachment", data.attachment);

    if (
      finalData.get("message") === "" &&
      finalData.get("attachment") === "null"
    ) {
      alert("Please provide either an Attachment, or a Message");
      return;
    }

    axios
      .post("/api/upload", finalData, {
        headers: { "x-recaptcha-token": data.recaptcha },
      })
      .then(dispatch(sendData()))
      .then((res) => {
        if (res.data.status === "OK") {
          alert("Thank you for sharing your message!");
          history.push("/thank-you");
          dispatch(resetSent());
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 400) {
          console.log("400");
          alert("reCAPTCHA Verification Failed");
        } else if (err.response.status === 415) {
          alert("Check the attachment: " + err.response.data.error);
        } else if (err.response.status === 500) {
          alert("Try again after some time");
          history.go("/");
          history.goBack();
        } else if (err.response.status === 403) {
          history.goBack("/403");
        }
      });
  };
};

export const sendData = () => {
  return {
    type: actionTypes.SEND_DATA,
  };
};

export const resetSent = () => {
  return {
    type: "resetSent",
  };
};
