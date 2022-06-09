import {
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_FAIL
} from "../constants/company.constant";

const initialState = {
  companyList: [],
  notification: {},
};

const companyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COMPANY_SUCCESS:
      return { ...state, notification: payload };
    case ADD_COMPANY_FAIL:
      return { ...state };
    case GET_COMPANY_LIST_SUCCESS:
      return {...state, companyList: payload}
    case GET_COMPANY_LIST_FAIL:
      return {...state, notification: payload}
    case "CLOSE_NOTIFICATION": {
      state.notification.open = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default companyReducer;
