import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCompanyDetailAPI } from "src/services/api/company/companyService";

export const getJobByCompany = createAsyncThunk(
    "job/getJobByCompany",
    async (companyId) => {
      const res = await getCompanyDetailAPI(companyId);
      return res.data;
    }
  );