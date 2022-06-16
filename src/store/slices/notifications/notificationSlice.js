import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api/apiConfig";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        open: false,
        severity: "",
        message: ""
    },
    reducers: {
        successMess: (state, action) => {
            return state = {
                open: true,
                severity: "success",
                message: action.payload
            }
        },
        errorMess: (state, action) => {
            return state = {
                open: true,
                severity: "error",
                message: action.payload
            }
        },
        close: (state, action) => {
            return state = {
                open: false,
                severity: "",
                message: ""
            }
        }
    },
})

export default notificationSlice


