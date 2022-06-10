import axios from "axios";
import action from "./action";

import { ADD_USER_SUCCESS, ADD_USER_FAIL } from "../constants/user.constant";

/**
 * Get user List
 * output: user list
 */
export const getUserList = () => {
  return (dispatch) => {
    //dispatch(startLoading());

    axios
      .get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      )
      .then((response) => {
        //console.log(response);
        dispatch(action("GET_USER_LIST_SUCCESS", response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(action("GET_USER_LIST_FAIL", err.response.data.message));
      });
  };
};

//Add user

export const checkUser = (data, navigate) => {
  return (dispatch) => {
    axios
      // .post("http://localhost:8085/api/user", data)
      .post("https://6287218e7864d2883e7efbd1.mockapi.io/user", data)
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
        dispatch(action(ADD_USER_FAIL, notification))
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
      // .post("http://localhost:8085/api/candidate", data)
      .post("https://6287218e7864d2883e7efbd1.mockapi.io/user", data)
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
