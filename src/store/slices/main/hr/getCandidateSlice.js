import { createSlice } from '@reduxjs/toolkit';
import { getCandidateThunk } from 'src/store/action/hr/getCandidateAction';
const getCandidateSlice = createSlice({
  name: 'candidateList',
  initialState: {
    candidateList: [],
    province: '',
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCandidateThunk.fulfilled, (state, { payload }) => {
      state.candidateList = payload.contents;
      state.totalPages = payload.totalPages;
      state.totalItems = payload.totalItems;
      state.currentPage = payload.numberOfCurrentPage;
    });
  },
});

export default getCandidateSlice;
