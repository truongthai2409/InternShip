import { createAsyncThunk } from '@reduxjs/toolkit';
import authenticate from 'src/store/api/authenticate/authenticate';
const {
  resetPassword,
  verifyEmail,
  activeAccount,
  changePassword,
  registerNewHr,
} = authenticate;

export const resetPasswordThunk = createAsyncThunk(
  'authenticate/resetPassword',
  async (data) => {
    const res = await resetPassword(data);
    return res;
  }
);

export const verifyEmailThunk = createAsyncThunk(
  'authenticate/verifyEmail',
  async (data) => {
    const res = await verifyEmail(data);
    return res;
  }
);

export const activeAccountThunk = createAsyncThunk(
  'authenticate/activeAccount',
  async (data) => {
    const res = await activeAccount(data);
    return res;
  }
);

export const changePasswordThunk = createAsyncThunk(
  'authenticate/changePassword',
  async (data) => {
    const res = await changePassword(data);
    return res;
  }
);
export const registerNewHrThunk = createAsyncThunk(
  'authenticate/registerNewHr',
  async (data) => {
    const res = await registerNewHr(data);
    return res;
  }
);
