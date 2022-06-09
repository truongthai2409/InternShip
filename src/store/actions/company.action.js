import axios from "axios";

import {
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
} from "../constants/company.constant";

import action from "./action";

/**
 * Add company
 * @param data
 * @returns notification
 */
export const addCompany = (data) => {
  return (dispatch) => {
    axios
      .post("", data)
      .then((response) => {
        const notification = {
          open: true,
          severity: "success",
          message: "Thêm công ty thành công",
        };
        dispatch(action(ADD_COMPANY_SUCCESS, notification));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
