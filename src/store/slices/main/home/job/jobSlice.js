import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_API;

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobList: [],
    jobListCompany: [],
    jobListName: [],
    indexCardActive: 0,
    jobDetail: {},
    jobPosition: [],
    status: "fail",
  },
  reducers: {
    updateIdJobActive: (state, action) => {
      state.idJobActive = action.payload;
    },
    updateIndexCardActive: (state, action) => {
      state.indexCardActive = action.payload;
      state.jobDetail = state.jobList[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobList.fulfilled, (state, { payload }) => {
      state.jobList = payload;
      state.jobDetail = payload[0];
    });
    builder.addCase(getJobByCompany.fulfilled, (state, { payload }) => {
      state.jobListCompany = payload;
    });
    builder.addCase(getJobListByUsername.fulfilled, (state, { payload }) => {
      state.jobList = payload;
    });
    builder.addCase(getJobByName.fulfilled, (state, { payload }) => {
      state.jobListName = payload;
      if (payload.length > 0) {
        state.jobDetail = payload[0];
      } else {
      }
    });
    builder.addCase(getJobById.fulfilled, (state, { payload }) => {
      state.jobActive = payload;
    });
    builder.addCase(getJobPositionList.fulfilled, (state, { payload }) => {
      state.jobPosition = payload;
    });
    builder.addCase(addJob.fulfilled, (state, { payload }) => {
      state.status = "success";
    });
  },
});

export const getJobList = createAsyncThunk(
  "job/getJobList",
  async (jobDetail) => {
    return axios
      .get(`${baseURL}/api/job`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getJobById = createAsyncThunk("job/getJobById", async (jobId) => {
  return axios
    .get(`${baseURL}/api/job/${jobId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getJobByName = createAsyncThunk(
  "job/getJobByName",
  async (jobName) => {
    return axios
      .get(`${baseURL}/api/job/search?q=${jobName}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getJobListByUsername = createAsyncThunk(
  "job/getJobListByUser",
  async (username) => {
    return axios
      .get(`${baseURL}/api/r2s/job/username?username=${username}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getJobPositionList = createAsyncThunk(
  "job/getJobPositionList",
  async () => {
    return axios
      .get(`${baseURL}/api/r2s/JobPosition`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const addJob = createAsyncThunk("job/addJob", async (jobData) => {
  return axios
    .post(`${baseURL}/api/r2s/job`, jobData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getJobByCompany = createAsyncThunk(
  "job/getJobByCompany",
  async (companyId) => {
    return axios
      .get(`${baseURL}/api/job/company/${companyId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const { updateIdJobActive, updateIndexCardActive } = jobSlice.actions;
export default jobSlice;
