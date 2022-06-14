import {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_FIRST_USER_SUCCESS,
  GET_FIRST_USER_FAIL,
  GET_USER_LIST_PAGING_SUCCESS,
  GET_USER_LIST_PAGING_FAIL,
} from "../constants/user.constant";

const initialState = {
  userList: [],
  notification: {},
  page: 0,
  error: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USER_LIST_SUCCESS":
      return { ...state, userList: payload };
    case GET_FIRST_USER_SUCCESS:
      return { ...state, userList: payload };
    case GET_FIRST_USER_FAIL:
      return { ...state, notification: payload };
    case GET_USER_LIST_PAGING_SUCCESS:
      return { ...state, userList: payload };
    case GET_USER_LIST_PAGING_FAIL:
      return { ...state, notification: payload };
    case ADD_USER_SUCCESS:
      return { ...state, notification: payload };
    case ADD_USER_FAIL:
      return { ...state, error: payload };
    case "CLOSE_NOTIFICATION": {
      state.notification.open = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default userReducer;
