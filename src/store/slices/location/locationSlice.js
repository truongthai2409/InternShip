import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import notificationSlice from "../../notifications/notificationSlice";
// import { useDispatch } from "react-redux";

const locationSlice = createSlice({
  name: "Location",
  initialState: {
    provinceList: [],
    districtList: [],
    locationList: [],
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getProviceList.fulfilled, (state, { payload }) => {
      state.provinceList = payload;
    });
    builder.addCase(getDistrictList.fulfilled, (state, { payload }) => {
      state.districtList = payload;
    });
  },
});

export default locationSlice;

/**
 * get province list by country id
 * @params countryId
 * @return provinceList
 */
export const getProviceList = createAsyncThunk(
  "location/getProviceList",
  async (countryId = 231) => {
    // console.log(countryId);
    return axios
      .get(`http://localhost:8085/api/province/country/${countryId}`)
      .then((response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getDistrictList = createAsyncThunk(
  "location/getDistrictList",
  async (provinceId) => {
    console.log(provinceId);
    return axios
      .get(`http://localhost:8085/api/district/province/${provinceId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
