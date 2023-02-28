import { createAsyncThunk } from "@reduxjs/toolkit";
import companyManagementAPI from "src/store/api/company/companyManagementAPI";

const {
  getJobByCompany,
  getMajorListAPI,
  getMajorDetailAPI,
} = companyManagementAPI

export const getJobByCompanyThunk = createAsyncThunk(
  "company/getJobByCompanyThunk",
  async (companyId) => {
    const res = await getJobByCompany(companyId);
    return res;
  }
);
export const getMajorListThunk = createAsyncThunk(
  "major/getMajorList",
  async (args) => {
    const res = await getMajorListAPI(args);
    return res;
  }
);
export const getMajorDetailThunk = createAsyncThunk(
  "major/getMajorDetail",
  async (args) => {
    const res = await getMajorDetailAPI(args);
    return res;
  }
);
