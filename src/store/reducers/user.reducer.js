const initialState = {
  userList: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USER_LIST_SUCCESS":
      return { ...state, userList: payload };
    default:
      return state;
  }
};

export default userReducer;
