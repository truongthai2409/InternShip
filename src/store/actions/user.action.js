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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
