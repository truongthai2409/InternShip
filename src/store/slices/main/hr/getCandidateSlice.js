import { createSlice } from '@reduxjs/toolkit';
import { getCandidateThunk } from 'src/store/action/hr/getCandidateAction';
const getCandidateSlice = createSlice({
  name: 'candidateList',
  initialState: {
    candidateList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCandidateThunk.fulfilled, (state, { payload }) => {
      state.candidateList = payload.contents;
    });
  },
});

export default getCandidateSlice;
