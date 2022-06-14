import { configureStore } from '@reduxjs/toolkit';
import registerSlice from "./slices/register/registerSlice";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
  },
});
export default store;
