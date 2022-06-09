import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import companyReducer from "./company.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
});

export default rootReducer;
