import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobList: [],
        indexCardActive: 0,
        jobActive: {}
    },
    reducers: {
        updateIdJobActive: (state, action) => {
            state.idJobActive = action.payload;
        },
        updateIndexCardActive: (state, action) => {
            state.indexCardActive = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getJobList.fulfilled, (state, { payload }) => {
            state.jobList = payload;
        });
        builder.addCase(getJobById.fulfilled, (state, { payload }) => {
            state.jobActive = payload;
        })
    },
});

export const getJobList = createAsyncThunk("job/getJobList", async () => {
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
    console.log("here",jobId)
    return axios
    .get(`http://localhost:8085/api/job/${jobId}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data
    })
})


export const { updateIdJobActive, updateIndexCardActive } = jobSlice.actions;
export default jobSlice;
