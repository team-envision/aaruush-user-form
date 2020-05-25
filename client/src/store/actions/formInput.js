import axios from "axios";
import * as actionTypes from "./actionTypes";

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
      window.location.reload(false);
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
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const sendData = () => {
  return {
    type: actionTypes.SEND_DATA,
  };
};
