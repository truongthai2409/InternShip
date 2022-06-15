import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./slices/register/registerSlice";
import userSlice from "./slices/Admin/user/userSlice";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    user: userSlice.reducer,
  },
});
export default store;
