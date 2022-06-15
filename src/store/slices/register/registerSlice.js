import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api/apiConfig";

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
                console.log("Success");
                state.user = action.payload
            })
    }
})

export default registerSlice


export const checkUser = createAsyncThunk("register/checkUser", async (data) => {
    const res = await api.post("http://localhost:8085/api/user", data)
        .then((res) => {
            // const notification = {
            //     open: true,
            //     severity: "success",
            //     message: "Thành công",
            //   };
            sessionStorage.setItem("account", JSON.stringify(data));
            //   dispatch(action(ADD_USER_SUCCESS, notification));
            return res
        })
        .catch(error => {
            return error.response.data
        })
        console.log(res);
    return res
})

export const registerUser = createAsyncThunk("register/registerUser", async (data) => {
    const rolePath = {
        3: "candidate",
        1: "hr",
        4: "partner"
    }

    const role = rolePath[data.createUser.role.id]
    console.log(role);
    const res = await api.post(`http://localhost:8085/api/${role}`, data)
    .then((res) => {
        // const notification = {
        //   open: true,
        //   severity: "success",
        //   message: "Đăng ký thành công",
        // };
        //console.log(response);
        // dispatch(action(ADD_USER_SUCCESS, notification));
        console.log(res)
      })
    // .catch((err) => {
    //     console.log(err);
    // });

    return res
})