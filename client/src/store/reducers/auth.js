import * as actionType from "../actions/actionTypes";

const initialState = {
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AFTER_LOGIN:
      let loginTimeout = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("authTokenExpiration", loginTimeout);
      return {
        ...state,
        isAuth: true,
      };
    case actionType.CHECK_LOGIN:
      return {
        ...state,
        isAuth: true,
      };
    case actionType.LOGOUT:
      localStorage.removeItem("authToken");
      alert("You are about to be logged out");
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default reducer;
