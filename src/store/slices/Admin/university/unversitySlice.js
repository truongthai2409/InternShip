import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";
import api from "../../../../config/api/apiConfig";
// import { useDispatch } from "react-redux";

const universitySlice = createSlice({
  name: "university",
  initialState: {
    universityList: [],
    universityDetail: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getUniversityList.fulfilled, (state, { payload }) => {
      state.universityList = payload;
    });
    builder.addCase(addUniversity.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(getUniversityDetail.fulfilled, (state, { payload }) => {
      state.universityDetail = payload;
    });
    builder.addCase(updateUniversityInfo.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
  },
});

export default universitySlice;

/**
 * get company list
 * @returns company list
 */
export const getUniversityList = createAsyncThunk(
  "university/getUniversityList",
  async () => {
    return await axios
      .get("http://localhost:8085/api/university")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * Add company
 * @param data
 * @returns notification
 */

export const addUniversity = createAsyncThunk(
  "university/addUniversity",
  async (data, thunkAPI) => {
    const { universityData, reset, setImage } = data;
    console.log(reset);
    return api
      .post("http://localhost:8085/api/university", universityData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Thêm trường thành công")
        );
        setImage();
        reset();
        // return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response.data;
      });
  }
);

/**
 * get company detail by comId
 * @params comId
 * @return company detail
 */
export const getUniversityDetail = createAsyncThunk(
  "university/getUniversityDetail",
  async (uniId) => {
    return await axios
      .get(`http://localhost:8085/api/university/${uniId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * @params comId updateData
 * @return
 * success => notification
 * error => error.response.data
 */
export const updateUniversityInfo = createAsyncThunk(
  "university/updateUniversityInfo",
  async (updateData, thunkAPI) => {
    const { universityData, setIsEdit } = updateData;
    // console.log(companyData);
    return axios
      .put(
        `http://localhost:8085/api/university/${universityData.id}`,
        universityData
      )
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật Trường thành công")
        );
        if (setIsEdit) {
          setIsEdit(false);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        return error.response.data;
      });
  }
);
