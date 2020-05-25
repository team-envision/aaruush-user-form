import * as actionType from "../actions/actionTypes";

const initialState = {
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AFTER_LOGIN:
      return {
        ...state,
        isAuth: true,
      };
    default:
      return state;
  }
};

export default reducer;
