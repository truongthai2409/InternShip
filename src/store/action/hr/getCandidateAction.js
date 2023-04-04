import { createAsyncThunk } from '@reduxjs/toolkit';
import getCandidateByHr from 'src/store/api/hr/getCandidate';

const { getCandidate } = getCandidateByHr;

export const getCandidateThunk = createAsyncThunk(
  'hr/getCandidateThunk',
  async (data) => {
    console.log('🚀 ~ file: getCandidateAction.js:9 ~ data:', data);
    const res = await getCandidate(data);
    return res;
  }
);
