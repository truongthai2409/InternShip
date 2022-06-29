import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import notificationSlice from "../../notifications/notificationSlice";
// import { useDispatch } from "react-redux";
import api from "../../../config/api/apiConfig";
import notificationSlice from "../notifications/notificationSlice";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    provinceList: [],
    districtList: [],
    locationList: [],
    error: [],
    districtById:[],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getProvinceList.fulfilled, (state, { payload }) => {
      state.provinceList = payload;
    });
    builder.addCase(getDistrictList.fulfilled, (state, { payload }) => {
      state.districtList = payload;
    });
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => {
      state.locationList = payload;
    });
    builder.addCase(getDistrictById.fulfilled, (state, { payload }) => {
      state.districtById = payload;
    });

    builder.addCase(addLocation.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
      // state.majorList = payload;
    });
  },
});

export default locationSlice;

/**
 * get province list by country id
 * @params countryId
 * @return provinceList
 */
export const getProvinceList = createAsyncThunk(
  "location/getProviceList",
  async (countryId) => {
    // console.log(countryId);
    return axios
      .get(`http://localhost:8085/api/province/country/${countryId}`)
      .then((response) => {
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
    return axios
      .get(`http://localhost:8085/api/district/province/${provinceId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const getDistrictById = createAsyncThunk(
  "location/getDistrictById",
  async (provinceId) => {
    return axios
      .get(`http://localhost:8085/api/district/${provinceId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getLocationList = createAsyncThunk(
  "location/getLocationList",
  async () => {
    return axios
      .get(`http://localhost:8085/api/location`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);


export const addLocation = createAsyncThunk(
  "location/addLocation",
  async (data, thunkAPI) => {
    return api
      .post(`http://localhost:8085/api/location`,data )
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Thêm location thành công")
        );
        data.reset();
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);