import { createAsyncThunk } from '@reduxjs/toolkit';
import job from 'src/store/api/job/job';
const { getDetailJobById } = job;

export const getDetailJobByIdThunk = createAsyncThunk(
  'job/getDetailJobById',
  async (id) => {
    const res = await getDetailJobById(id);
    return res;
  }
);
