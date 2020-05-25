import * as actionType from "../actions/actionTypes";

const initialState = {
  recordsArray: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_RECORDS:
      return {
        ...state,
        recordsArray: action.records.reverse(),
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
