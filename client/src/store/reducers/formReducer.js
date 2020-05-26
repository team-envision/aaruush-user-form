import * as actionType from "../actions/actionTypes";

const initialState = {
  sent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SEND_DATA:
      return {
        ...state,
        sent: true,
      };
    case "resetSent":
      return {
        ...state,
        sent: false,
      };
    default:
      return state;
  }
};

export default reducer;
