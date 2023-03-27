import { createAsyncThunk } from '@reduxjs/toolkit';
import candidate from 'src/store/api/candidate/candidate';

const { applyJob, jobStatus } = candidate;

export const applyJobThunk = createAsyncThunk(
  'candidate/applyJob',
  async (data) => {
    const res = await applyJob(data);
    return res;
  }
);
export const jobStatusThunk = createAsyncThunk(
  'candidate/jobStatus',
  async (id, status) => {
    const res = await jobStatus(id, status);
    return res;
  }
);
