import {
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
} from "../constants/company.constant";

const initialState = {
  notification: {},
};

const companyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COMPANY_SUCCESS:
      return { ...state, notification: payload };
    case ADD_COMPANY_FAIL:
      return { ...state };
    case "CLOSE_NOTIFICATION": {
      state.notification.open = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default companyReducer;
