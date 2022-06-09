import axios from "axios";
import action from "./action";

import { ADD_USER_SUCCESS, ADD_USER_FAIL } from "../constants/user.constant";

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
        dispatch(action("GET_USER_LIST_FAIL", err));
      });
  };
};

//Add user

export const registerUser = (data, navigate) => {
  return (dispatch) => {
    axios
      .post("https://6287218e7864d2883e7efbd1.mockapi.io/user", data)
      .then((response) => {
        const notification = {
          open: true,
          severity: "success",
          message: "Đăng ký thành công",
        };
        //console.log(response);
        dispatch(action(ADD_USER_SUCCESS, notification));
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const notification = {
          open: true,
          severity: "error",
          message: "Đăng ký thành công",
        };
        dispatch(action(ADD_USER_FAIL, notification));
      });
  };
};
