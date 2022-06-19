import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../config/api/apiConfig";

const registerSlice = createSlice({
    name: "register",
    initialState: {
        status: "idle",
        user: {},
        error: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkUser.fulfilled, (state, action) => {
                if (action.payload?.username) {
                    state.status = "success step 2"
                    state.user = action.payload
                    state.error = {}
                } else {
                    state.status = "fail"
                    state.user = {}
                    state.error = action.payload
                }
            })
            .addCase(registerUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload?.user) {
                    state.user = action.payload
                    state.status = "success"
                    state.error = {}
                } else {
                    state.status = "fail"
                    state.error = action.payload
                }
            })
    }
})

export default registerSlice


export const checkUser = createAsyncThunk("register/checkUser", async (data) => {
    const res = await api.post("http://localhost:8085/api/user/", data)
        .then((res) => {
            sessionStorage.setItem("account", JSON.stringify(data));
            return res
        })
        .catch(error => {
            return error.response.data
        })
    return res
})

export const registerUser = createAsyncThunk("register/registerUser", async (data) => {
    const rolePath = {
        3: "candidate",
        1: "hr",
        4: "partner"
    }
    
    console.log(data);
    // const res = await api.post(`http://localhost:8085/api/${role}`, data)
    const res = await api.post(`http://localhost:8085/api/user/uploadFile`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
          }
    })
    .then((res) => {
        console.log(res);
        return res
        })
    .catch((err) => {
        console.log(err);
        return err
    });
    console.log(res);
    return data
})