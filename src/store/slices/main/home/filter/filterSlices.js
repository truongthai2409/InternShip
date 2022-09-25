import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API;

const filterSlices = createSlice({
    name: "filter",
    initialState: {
        type: "",
        order: "oldest",
        position: "",
        name: "",
        province: "",
        major: "",
        no: 0,
        limit: 5,
        index: 0,
        jobFilter: [],
        jobPage: [],
    },
    reducers: {
        typeFilterChange: (state, action) => {
            // mutation || IMMER
            state.type = action.payload;
        },
        orderFilterChange: (state, action) => {
            state.order = action.payload;
        },
        positionFilterChange: (state, action) => {
            state.position = action.payload;
        },
        nameFilterChange: (state, action) => {
            state.name = action.payload;
        },
        provinceFilterChange: (state, action) => {
            state.province = action.payload;
        },
        majorFilterChange: (state, action) => {
            state.major = action.payload;
        },
        noFilterChange: (state, action) => {
            state.no = action.payload
        },
        limitFilterChange: (state, action) => {
            state.limit = action.payload
        },
        indexFilterChange: (state, action) => {
            state.limit = action.payload
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
    typeFilterChange,
    orderFilterChange,
    positionFilterChange,
    nameFilterChange,
    provinceFilterChange,
    majorFilterChange,
    noFilterChange,
    limitFilterChange,
    indexFilterChange
} = filterSlices.actions;
export default filterSlices;