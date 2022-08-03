import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API;

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobList: [],
    jobListCompany: [],
    jobListName: [],
    jobListActived: [],
    jobListDisabled: [],
    jobDetailById: {},
    indexCardActive: 0,
    idJobActive: 0,
    jobDetail: {},
    jobPosition: [],
    status: "fail",
    error: "",
  },
  reducers: {
    updateIdJobActive: (state, action) => {
      state.idJobActive = action.payload;
    },
    updateIndexCardActive: (state, action) => {
      state.indexCardActive = action.payload;
      state.jobDetail = state?.jobListName[action.payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getJobList.fulfilled, (state, { payload }) => {
      state.jobList = payload.contents;
    });
    builder.addCase(getJobByCompany.fulfilled, (state, { payload }) => {
      state.jobListCompany = payload;
    });
    builder.addCase(getJobListByUserId.fulfilled, (state, { payload }) => {
      if (payload.httpCode === 404) {
        state.error = 404;
      } else {
        state.jobListActived = payload.filter((job) => {
          return job.status.id === 1;
        });
        state.jobListDisabled = payload.filter((job) => {
          return job.status.id === 4;
        });
        state.status = "fail";
      }
    });
    builder.addCase(getJobByName.fulfilled, (state, { payload }) => {
      state.jobListName = payload;
      if (payload.contents.length > 0) {
        state.jobDetail = payload.contents[0];
      } else {
      }
    });
    builder.addCase(getJobByNameAndLocation.fulfilled, (state, { payload }) => {
      state.jobListName = payload.contents;
      if (payload.contents.length > 0) {
        state.jobDetail = payload.contents[0];
      } else {
      }
    });
    builder.addCase(getJobById.fulfilled, (state, { payload }) => {
      state.jobActive = payload;
      state.jobDetailById = payload;
    });
    builder.addCase(getJobPositionList.fulfilled, (state, { payload }) => {
      state.jobPosition = payload;
    });
    builder.addCase(addJob.fulfilled, (state) => {
      toast.success("Đăng tuyển công việc thành công!");
    });
    builder.addCase(disableJob.fulfilled, (state, { payload }) => {
      toast.success("Đóng công việc thành công!");
    });
  },
});

export const getJobList = createAsyncThunk("job/getJobList", async (args) => {
  return axios
    .get(`${baseURL}/api/r2s/job?no=${args[0] - 1}&limit=${args[1]}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getJobById = createAsyncThunk("job/getJobById", async (jobId) => {
  return axios
    .get(`${baseURL}/api/r2s/job/${jobId}`)
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
      .get(`${baseURL}/api/r2s/job/search?name=${jobName}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const getJobByNameAndLocation = createAsyncThunk(
  "job/getJobByNameAndLocation",
  async (dataSearch) => {
    return axios
      .get(`${baseURL}/api/r2s/job/search`, {
        params: dataSearch,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getJobListByUserId = createAsyncThunk(
  "job/getJobListByUser",
  async (userId) => {
    return axios
      .get(`${baseURL}/api/r2s/job/user/${userId}`)
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
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/job`, jobData, axiosConfig)
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

export const disableJob = createAsyncThunk("job/disableJob", async (args) => {
  console.log("args", args[0], args[1]);
  return axios
    .put(`http://localhost:8085/api/r2s/job/6`, args[1])
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const {
  updateIdJobActive,
  updateIndexCardActive,
  updateStatusAddJob,
  getJobDetail,
} = jobSlice.actions;
export default jobSlice;
