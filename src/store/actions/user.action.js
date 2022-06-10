import axios from "axios";
import action from "./action";

import {
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_FIRST_USER_SUCCESS,
  GET_FIRST_USER_FAIL,
  GET_USER_LIST_PAGING_SUCCESS,
  GET_USER_LIST_PAGING_FAIL,
} from "../constants/user.constant";

/**
 * Get user List
 * output: user list
 */
export const getUserList = () => {
  return (dispatch) => {
    //dispatch(startLoading());

    axios
      .get("http://localhost:8085/api/user")
      .then((response) => {
        console.log(response);
        dispatch(action(GET_FIRST_USER_SUCCESS, response.data));
      })
      .catch((err) => {
        const notification = {
          open: true,
          severity: "error",
          message: "Không tải được danh sách users",
        };
        dispatch(action(GET_FIRST_USER_FAIL, notification));
      });
  };
};

/**
 * Get user List paging
 * output: user list
 */
export const getUserListPaging = (page) => {
  return (dispatch) => {
    //dispatch(startLoading());

    axios
      .get(`http://localhost:8085/api/user?no=${page}`)
      .then((response) => {
        //console.log(response);
        dispatch(action(GET_USER_LIST_PAGING_SUCCESS, response.data));
      })
      .catch((err) => {
        const notification = {
          open: true,
          severity: "error",
          message: "Không tải được danh sách users",
        };
        dispatch(action(GET_USER_LIST_PAGING_FAIL, notification));
      });
  };
};

//Add user

export const checkUser = (data, navigate) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8085/api/user", data)
      // .post("https://6287218e7864d2883e7efbd1.mockapi.io/user", data)
      .then((response) => {
        const notification = {
          open: true,
          severity: "success",
          message: "Thành công",
        };
        console.log(response);

        sessionStorage.setItem("account", JSON.stringify(data));
        dispatch(action(ADD_USER_SUCCESS, notification));
        navigate(`/register/step3`);
      })
      .catch((err) => {
        console.log(err);
        const notification = {
          open: true,
          severity: "error",
          message: err.response.data.message,
        };
        dispatch(action(ADD_USER_FAIL, notification));
      });
  };
};

/**
 * User register
 * @param {*} data
 * @param {*} navigate
 * @returns notification
 */
export const registerUser = (data, navigate) => {
  return (dispatch) => {
    console.log(data);
    axios
      .post("http://localhost:8085/api/candidate", data)
      // .post("https://6287218e7864d2883e7efbd1.mockapi.io/user", data)
      .then((response) => {
        const notification = {
          open: true,
          severity: "success",
          message: "Đăng ký thành công",
        };
        //console.log(response);
        dispatch(action(ADD_USER_SUCCESS, notification));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
