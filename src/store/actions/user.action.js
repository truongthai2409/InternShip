import axios from "axios";
import action from "./action";

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
