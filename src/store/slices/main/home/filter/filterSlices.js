import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API;

const filterSlices = createSlice({
    name: "filter",
    initialState: {
        index: 0,
        jobFilter: [],
        jobPage: [],
    },
    reducers: {
        indexFilterChange: (state, action) => {
            state.index = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(jobFilters.fulfilled, (state, { payload }) => {
            state.jobFilter = payload.contents;
            state.jobPage = payload
        });
    },
});

export const jobFilters = createAsyncThunk(
    "filter/jobFilter",
    async (dataFilter) => {
        return axios.get(`${BASEURL}/api/r2s/job/filter`, {
            params: dataFilter
        }).then((res) => {
            return res.data
        }).catch((err) => {
            return err.response.data
        })
    })
export const {
    indexFilterChange
} = filterSlices.actions;
export default filterSlices;