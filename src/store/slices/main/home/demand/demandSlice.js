import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API;

const demandSlice = createSlice({
  name: "demand",
  initialState: {
    demandList: [],
    demandListUniversity: [],
    status: "fail",
    indexPartnerCardActive: 0,
    idPartnerCardActive: 0,
    demandDetail: {},
  },
  reducers: {
    updateIdPartnerCardActive: (state, action) => {
      state.idPartnerCardActive = action.payload;
    },
    updateIndexPartnerCardActive: (state, action) => {
      state.indexPartnerCardActive = action.payload;
      state.demandDetail = state?.demandList[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDemandListByUniId.fulfilled, (state, { payload }) => {
      state.demandListUniversity = payload;
    });
    builder
      .addCase(addDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDemand.fulfilled, (state, { payload }) => {
        toast.success("Đăng danh sách thực tập thành công!");
      });
    builder
      .addCase(getDemandList.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(getDemandList.fulfilled, (state, { payload }) => {
        state.demandList = payload;
        if (payload.length > 0) {
          state.demandDetail = payload[0];
        } else {
        }
      });
    builder
      .addCase(getDemandById.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(getDemandById.fulfilled, (state, { payload }) => {
        state.demandDetail = payload;
      });
    builder
      .addCase(updateDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDemand.fulfilled, (state, { payload }) => {
        toast.success("Cập nhật danh sách thực tập thành công!");
      });
  },
});

export const addDemand = createAsyncThunk("demand/addDemand", async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/partner/demand`, data, axiosConfig)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const updateDemand = createAsyncThunk(
  "demand/updateDemand",
  async (data) => {
    const { idDemand, demandData } = data;
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return axios
      .put(
        `${baseURL}/api/r2s/partner/demand/${idDemand}`,
        demandData,
        axiosConfig
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getDemandListByUniId = createAsyncThunk(
  "university/getDemandListByUniId",
  async (uniId) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await axios
      .get(`${baseURL}/api/demand/filter-university/${uniId}`, axiosConfig)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const getDemandById = createAsyncThunk(
  "university/getDemandById",
  async (id) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await axios
      .get(`${baseURL}/api/demand/${id}`, axiosConfig)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const getDemandList = createAsyncThunk(
  "university/getDemandList",
  async () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await axios
      .get(`${baseURL}/api/demand`, axiosConfig)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);
export const { updateIndexPartnerCardActive } = demandSlice.actions;
export default demandSlice;
