import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getDemandListThunk } from "src/store/action/hr/HrAction";
const HrSlice = createSlice({
  name: "hrSearch",
  initialState: {
    type: [],
    order: "newest",
    position: [],
    name: "",
    province: {},
    major: [],
    no: 0,
    limit: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(getDemandListThunk.fulfilled, (state, { payload }) => {
      state.type = payload.type;
      state.order = payload.order;
      state.name = payload.name;
      state.province = payload.province;
      state.major = payload.major;
      state.no = payload.no;
      state.limit = payload.limit;
      state.position = payload.position;
    });
  },
});

export default HrSlice;
