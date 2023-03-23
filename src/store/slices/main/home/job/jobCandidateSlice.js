import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jobCandidate from 'src/store/api/job/jobCandidate';

const { getJobCareByCandidate, getJobAppliedByCandidate } = jobCandidate;
const BASEURL = process.env.REACT_APP_API;

const jobCandidateSlice = createSlice({
  name: 'jobCandidateSlice',
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
    builder.addCase(
      getJobCareByCandidateThunk.fulfilled,
      (state, { payload }) => {
        state.jobCare = payload.contents;
        state.jobCareHavePage = payload;
      }
    );
    builder.addCase(addJobCare.fulfilled, (state, action) => {
      state.jobCare = [...state.jobCare, action.payload];
    });
  },
});

export const getJobApplyListByCandidate = createAsyncThunk(
  'jobCadidateSlice/getJobApplyListByCandidate',
  async (args) => {
    if (args.user.roleDTO.name.includes('Role_Candidate')) {
      const res = await getJobAppliedByCandidate(args.user.id);
      return res;
    }
  }
);
export const getJobCareByCandidateThunk = createAsyncThunk(
  'jobCadidateSlice/getJobCareByCandidate',
  async (args) => {
    if (args.user.roleDTO.name.includes('Role_Candidate')) {
      const res = await getJobCareByCandidate(args.user.username);
      return res;
    }
  }
);
export const addJobCare = createAsyncThunk(
  'jobCadidateSlice/addCareJob',
  async (args) => {
    return await axios
      .post(`${BASEURL}/api/candidate/job-care`, args[0], {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + args[1],
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const deleteJobCare = createAsyncThunk(
  'jobCadidateSlice/deleteJobCare',
  async (args) => {
    const header = {
      headers: {
        Authorization: 'Bearer ' + args[0].token,
      },
    };
    return await axios
      .delete(`${BASEURL}/api/candidate/job-care/${args[0].id}`, header)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export default jobCandidateSlice;
