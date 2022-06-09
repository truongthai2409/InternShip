import axios from "axios";

import {
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_FAIL
} from "../constants/company.constant";

import action from "./action";

/**
 * get company list
 * @returns company list
 */
export const getCompany = () => {
  return (dispatch) => {
    axios.get("http://localhost:8085/api/company")
    .then(res => {
      dispatch(action(GET_COMPANY_LIST_SUCCESS, res.data))
    })
    .catch(err => {
      const notification = {
        open: true,
        severity: "success",
        message: "Thêm công ty thành công",
      };
      dispatch(action(GET_COMPANY_LIST_FAIL, notification));
    })
  }
}

/**
 * Add company
 * @param data
 * @returns notification
 */
export const addCompany = (data) => {
  console.log("data", data)
  return (dispatch) => {
    axios
      .post("http://localhost:8085/api/company", data)
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
