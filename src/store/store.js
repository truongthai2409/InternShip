import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import registerSlice from "./slices/main/register/registerSlice";
import notificationSlice from "./slices/notifications/notificationSlice";
import userSlice from "./slices/Admin/user/userSlice";
import companySlice from "./slices/Admin/company/companySlice";
import loginSlice from "./slices/main/login/loginSlice";
import universitySlice from "./slices/Admin/university/unversitySlice";
import locationSlice from "./slices/location/locationSlice";
import majorSlice from "./slices/Admin/major/majorSlice";
import jobSlice from "./slices/main/home/job/jobSlice";


const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    notification: notificationSlice.reducer,
    user: userSlice.reducer,
    company: companySlice.reducer,
    authentication: loginSlice.reducer,
    university: universitySlice.reducer,
    location: locationSlice.reducer,
    major: majorSlice.reducer,
    job: jobSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
