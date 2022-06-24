import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useEffect } from 'react'
import {toast} from 'react-toastify'



export const LoginUser = createAsyncThunk("login/user", async (user) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/login`, user)
        localStorage.setItem("userInfo", JSON.stringify(response.data))
        return response.data
    } catch (err) {
        toast.error(err.response.data)
    }

})

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {
            firstName: "",
            lastName: "",
            generateToken: "",
            email: "",
            id: "",
            wallet_publicAddress: "",
            is_verified: "",
            createdAt: ""
        },
        pending: false,
        error: false
    },
    reducers: { },
    extraReducers: {
        [LoginUser.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [LoginUser.fulfilled]: (state, action) => {
            state.pending = false;
            state.userInfo = action.payload;

            // useEffect(() => {
            //     localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
            // }, [state.userInfo])
        },
        [LoginUser.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        }
    }
})

export default userSlice.reducer;