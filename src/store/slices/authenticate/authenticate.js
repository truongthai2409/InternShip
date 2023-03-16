import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getInformationCandidateByIdThunk } from 'src/store/action/authenticate/authenticateAction';

// file nay hinh nhu khong su dung, code k co
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
        console.log(payload)
        state.user = payload;
        state.role = state.role.name;
      }
    );
  },
});

export default authenticateSlice;
