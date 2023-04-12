import { createAsyncThunk } from '@reduxjs/toolkit';
import HrSeachAPI from 'src/store/api/hr/HrSearch';

const { getDemandList } = HrSeachAPI;

export const getDemandListThunk = createAsyncThunk(
  'demand/getDemandListThunk',
  async (args) => {
    const res = await getDemandList(args);
    return res;
  }
);
