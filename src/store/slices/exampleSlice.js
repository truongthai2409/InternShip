import { createSlice } from '@reduxjs/toolkit';
import { fetchExample } from '../action/company/companyAction';

const initialState = {
  value: [],
  isLoading: false,
  maxIndex: 20,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExample.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchExample.fullfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchExample.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default exampleSlice.reducer;
