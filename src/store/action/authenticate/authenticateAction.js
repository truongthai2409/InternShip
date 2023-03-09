import { createAsyncThunk } from '@reduxjs/toolkit';
import authenticate from 'src/store/api/authenticate/authenticate';
const { resetPassword } = authenticate;

export const resetPasswordThunk = createAsyncThunk(
  'authenticate/resetPassword',
  async (data) => {
    console.log(data);
    const res = await resetPassword(data);
    return res;
  }
);
