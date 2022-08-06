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
    listCandidatesApplied: [],
    totalPages: 0,
  },
  reducers: {
    updateIdJobActive: (state, action) => {
      state.idJobActive = action.payload;
    },
    updateIndexCardActive: (state, action) => {
      state.indexCardActive = action.payload;
      state.jobDetail = state?.jobListName[action.payload];
    },
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
          return job?.status.id === 1;
        });
        state.jobListDisabled = payload.filter((job) => {
          return job?.status.id === 4;
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
      if (payload?.contents?.length > 0) {
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
      state.status = "success";
    });
    builder.addCase(updateStatusJob.fulfilled, (state, { payload }) => {
      switch (payload?.status.id) {
        case 4:
          state.jobListActived = state.jobListActived.filter((job) => {
            return job.id !== payload.id;
          });
          state.jobListDisabled.push(payload);
          toast.success("Đóng công việc thành công!");
          break;
        default:
          toast.error("Chỉnh sửa trạng thái công việc thất bại!");
      }
    });
    builder.addCase(updateJob.fulfilled, (state, { payload }) => {
      toast.success("Chỉnh sửa công việc thành công!");
    });
    builder.addCase(getListCandidateApplied.fulfilled, (state, { payload }) => {
      console.log("payload:", payload);
      state.listCandidatesApplied = payload.contents;
      state.totalPages = payload.totalPages;
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

// function use for update ?status of job by id job
/**
 * para
 * args[0] : id job
 * args[1] : status
 */
export const updateStatusJob = createAsyncThunk(
  "job/updateStatusJob",
  async (args) => {
    return axios
      .put(`http://localhost:8085/api/r2s/admin/job/status/${args[0]}`, args[1])
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

// function use for update infor of job by id job
/**
 * para
 * args[0] : id job
 * args[1] : infor of job
 */
export const updateJob = createAsyncThunk("job/updateJob", async (args) => {
  return axios
    .put(`http://localhost:8085/api/r2s/job/${args[0]}`, args[1])
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

// function use for get list of candidate who apply into job
/**
 * para
 * args[0] : id job
 * args[1] : page
 * args[2] : amount of candidates in each time get
 */
export const getListCandidateApplied = createAsyncThunk(
  "job/getListCandidateApply",
  async (args) => {
    return axios
      .get(
        `http://localhost:8085/api/r2s/admin/candidate/job/${args[0]}?no=${
          args[1] - 1
        }&limit=${args[2]}`
      )
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
