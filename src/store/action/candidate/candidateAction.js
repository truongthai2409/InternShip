import { createAsyncThunk } from '@reduxjs/toolkit';
import candidate from 'src/store/api/candidate/candidate';

const { applyJob } = candidate;

export const applyJobThunk = createAsyncThunk(
  'candidate/applyJob',
  async (data) => {
    const res = await applyJob(data);
    return res;
  }
);
