import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getInformationCandidateByIdThunk } from 'src/store/action/authenticate/authenticateAction';

const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState: {
    user: {},
    role: '',
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getInformationCandidateByIdThunk.pending,
      (state, { payload }) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getInformationCandidateByIdThunk.fulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.role = state.userDetailsDTO.role.name;
      }
    );
  },
});

export default authenticateSlice;
