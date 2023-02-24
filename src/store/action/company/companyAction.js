import { createAsyncThunk } from "@reduxjs/toolkit";
import companyManagementAPI from "src/store/api/company/companyManagementAPI";

const {getJobByCompany} = companyManagementAPI

export const getJobByCompanyThunk = createAsyncThunk(
  "company/getJobByCompanyThunk",
  async (companyId) => {
    const res = await getJobByCompany(companyId);
    return res;
  }
);
