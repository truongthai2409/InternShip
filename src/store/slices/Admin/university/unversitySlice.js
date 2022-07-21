import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import notificationSlice from '../../notifications/notificationSlice'
import api from '../../../../config/api/apiConfig'
const baseURL = process.env.REACT_APP_API

const universitySlice = createSlice({
  name: 'university',
  initialState: {
    universityList: [],
    universityDetail: {},
    error: [],
    status: 'idle',
    user: {}
  },
  reducer: {},
  extraReducers: builder => {
    builder.addCase(getUniversityList.fulfilled, (state, { payload }) => {
      state.universityList = payload
    })
    builder.addCase(addUniversity.pending, (state, { payload }) => {
      state.status = 'loading'
    })
    builder.addCase(addUniversity.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload
      } else {
        state.user = payload
        state.status = 'success'
        state.error = {}
      }
    })
    builder.addCase(getUniversityDetail.fulfilled, (state, { payload }) => {
      state.universityDetail = payload
    })
    builder.addCase(updateUniversityInfo.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload
      }
    })
  }
})

export default universitySlice

/**
 * get company list
 * @returns company list
 */
export const getUniversityList = createAsyncThunk(
  'university/getUniversityList',
  async () => {
    return await axios
      .get(`${baseURL}/api/university`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

/**
 * Add company
 * @param data
 * @returns notification
 */

export const addUniversity = createAsyncThunk(
  'university/addUniversity',
  async data => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    }
    const { partnerData } = data
    const res = await axios
      .post(
        `${baseURL}/api/r2s/partner/university/create`,
        partnerData,
        axiosConfig
      )
      .then(res => {
        console.log(res)
        return res
      })
      .catch(error => {
        console.log(error)
        return error
      })
    return res
  }
)

/**
 * get company detail by comId
 * @params comId
 * @return company detail
 */
export const getUniversityDetail = createAsyncThunk(
  'university/getUniversityDetail',
  async uniId => {
    return await axios
      .get(`${baseURL}/api/university/${uniId}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

/**
 * @params comId updateData
 * @return
 * success => notification
 * error => error.response.data
 */
export const updateUniversityInfo = createAsyncThunk(
  'university/updateUniversityInfo',
  async (updateData, thunkAPI) => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    }
    const { universityData, uniId } = updateData
    return await axios
      .put(`${baseURL}/api/university/${uniId}`, universityData, axiosConfig)
      .then(response => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess('Cập nhật Trường thành công')
        )
        // if (setIsEdit) {
        //   setIsEdit(false);
        // }
      })
      .catch(error => {
        return error.response.data
      })
  }
)
