import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobList: [],
        indexCardActive: 0,
        jobDetail: {},
        jobPosition: [],
    },
    reducers: {
        updateIdJobActive: (state, action) => {
            state.idJobActive = action.payload;
        },
        updateIndexCardActive: (state, action) => {
            state.indexCardActive = action.payload;
            state.jobDetail = state.jobList[action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getJobList.fulfilled, (state, { payload }) => {
            state.jobList = payload;
            state.jobDetail = payload[0];
        });
        builder.addCase(getJobById.fulfilled, (state, { payload }) => {
            state.jobActive = payload;
        });
        builder.addCase(getJobPositionList.fulfilled, (state, { payload }) => {
            state.jobPosition = payload;
        });
    },
});

export const getJobList = createAsyncThunk("job/getJobList", async (jobDetail) => {
    return axios
        .get(`http://localhost:8085/api/job`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
});

export const getJobById = createAsyncThunk("job/getJobById", async (jobId) => {
    console.log("here", jobId);
    return axios
        .get(`http://localhost:8085/api/job/${jobId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
});

export const getJobPositionList = createAsyncThunk("job/getJobPositionList", async () => {
    return axios
        .get(`http://localhost:8085/api/JobPosition`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
});

export const { updateIdJobActive, updateIndexCardActive } = jobSlice.actions;
export default jobSlice;
