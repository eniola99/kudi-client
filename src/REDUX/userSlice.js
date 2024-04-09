import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {toast} from 'react-toastify'



export const LoginUser = createAsyncThunk(`login/user`, async (user) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_LOGIN}`, user)
        localStorage.setItem("info", response.data.info._id)
        localStorage.setItem('userToken', response.data.generateToken)
        return response.data
    } catch (err) {
        toast.error(err.response.data)
    }

})


export const UpdateUser = createAsyncThunk("update/user", async (user) => {
    const userId = localStorage.getItem('info')
    const generate = localStorage.getItem("userToken")
    try {
        const response = await axios.patch(`${process.env.REACT_APP_PATCH}/${userId}`, user, {
            headers: {
                "token": `Bearer ${generate}`,
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        toast.success('account successfully updated')
        return await response.data
    } catch (err) {
        toast.error(err.response.data)
    }
})


export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        pending: false,
        error: false
    },
    reducers: {
        LogoutCall: (state) => {
            state.userInfo = null;
        }
    },
    extraReducers: {
        [LoginUser.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [LoginUser.fulfilled]: (state, action) => {
            state.pending = false;
            state.userInfo = action.payload;
        },
        [LoginUser.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [UpdateUser.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [UpdateUser.fulfilled]: (state, action) => {
            state.pending = false;
            state.userInfo = action.payload;
        },
        [UpdateUser.rejected]: (state, action) => {
            state.pending = false;
            state.error = action.error.message;
        }
    },
})

export const { LogoutCall } = userSlice.actions

export default userSlice.reducer;