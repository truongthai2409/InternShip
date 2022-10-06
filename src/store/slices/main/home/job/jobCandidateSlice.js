import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API;

const jobCandidateSlice = createSlice({
  name: "jobCandidateSlice",
  initialState: {
    jobApplyList: [],
    jobApplyListHavePage: [],
    jobCare: [],
    jobCareHavePage: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getJobApplyListByCandidate.fulfilled,
      (state, { payload }) => {
        if (payload) {
            state.jobApplyList = payload.contents;
            state.jobApplyListHavePage = payload;
        }
      }
    );
    builder.addCase(getJobCareByCandidate.fulfilled, (state, { payload }) => {
      state.jobCare = payload.contents;
      state.jobCareHavePage = payload;
    });
  },
});

export const getJobApplyListByCandidate = createAsyncThunk(
  "jobCadidateSlice/getJobApplyListByCandidate",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args?.user?.token,
      },
    };
    if (args?.user?.role?.includes("Role_Candidate")) {
      return await axios
        .get(`${BASEURL}/api/r2s/candidate/user/${args?.user?.idUser}`, header)
        .then(async (response) => {
          try {
            const response_1 = await axios.get(
              `${BASEURL}/api/applylist/candidate/${response.data.id}?no=${args?.page?.no}&limit=${args?.page?.limit}`
            );
            return response_1.data;
          } catch (error) {
            return error.response.data;
          }
        })
        .catch((error) => {
          return error.response.data;
        });
    }
  }
);
export const getJobCareByCandidate = createAsyncThunk(
  "jobCadidateSlice/getJobCareByCandidate",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args.user.token,
      },
    };
    if (args.user.role.includes("Role_Candidate")) {
      return await axios
        .get(
          `${BASEURL}/api/r2s/carelist/user/${args.user.username}?no=${args.page.no}&limit=${args.page.limit}`,
          header
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
    }
  }
);
export default jobCandidateSlice;
