import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./slices/register/registerSlice";
import userSlice from "./slices/Admin/user/userSlice";
import companySlice from "./slices/Admin/company/companySlice";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    user: userSlice.reducer,
    company: companySlice.reducer,
  },
});
export default store;
