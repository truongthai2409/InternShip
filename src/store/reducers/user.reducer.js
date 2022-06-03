const initialState = {
  user: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "Get_user":
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default userReducer;
