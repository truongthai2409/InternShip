import { createAsyncThunk } from '@reduxjs/toolkit';
import job from 'src/store/api/job/job';
const { getDetailJobById, getRelatedJobByCompanyId } = job;

export const getDetailJobByIdThunk = createAsyncThunk(
  'job/getDetailJobById',
  async (id) => {
    const res = await getDetailJobById(id);
    return res;
  }
);

export const getRelatedJobByCompanyIdThunk = createAsyncThunk(
  'job/getRelatedJobByCompanyId',
  async (id) => {
    const res = await getRelatedJobByCompanyId(id);
    return res;
  }
);
