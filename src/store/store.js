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
import ratingSlice from "./slices/main/home/rating/rating";
import markJobSlice from "./slices/main/mark/markSlice";
import applySlice from "./slices/main/candidate/apply/applySlice";
import infoCandidateSlice from "./slices/main/candidate/info/infoCandidateSlice";

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
    rating: ratingSlice.reducer,
    mark: markJobSlice.reducer,
    apply: applySlice.reducer,
    infoCandidate: infoCandidateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
