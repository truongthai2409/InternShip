import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerApi from '../../../config/api/registerApi'
import axios from "axios"


const registerSlice = createSlice({
    name: "register",
    initialState: {
        status: "idle",
        user: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkUser.fulfilled, (state, action) => {
                state.status = "navigating"
                console.log(action.payload);
                state.user = action.payload
            })
            .addCase(registerUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload);
            })
    }
})

export default registerSlice

export const checkUser = createAsyncThunk("register/checkUser", async (data) => {
    const res = await registerApi.checkUser(data)
        .then((res) => {
            const notification = {
                open: true,
                severity: "success",
                message: "Thành công",
              };
            sessionStorage.setItem("account", JSON.stringify(data));
            //   dispatch(action(ADD_USER_SUCCESS, notification));
            return res
        })
        .catch((err) => {
            console.log(err);
        })
    console.log(res);
    
    return res
})

export const registerUser = createAsyncThunk("register/registerUser", async (data) => {
    const rolePathList = [
        {
            id: 3,
            path: "candidate"
        },
        {
            id: 1,
            path: "hr"
        },
        {
            id: 4,
            path: "partner"
        }
    ]
    

    const rolepath = rolePathList.map((role) => {
        if (role.id === parseInt(data.createUser.role.id)){
            return role.path
        }
    })

    const res = await registerApi.registerUser(data, rolepath[0])
    // .then((res) => {
    //     const notification = {
    //       open: true,
    //       severity: "success",
    //       message: "Đăng ký thành công",
    //     };
    //     //console.log(response);
    //     // dispatch(action(ADD_USER_SUCCESS, notification));
    //   })
    // .catch((err) => {
    //     console.log(err);
    // });

    return res
})