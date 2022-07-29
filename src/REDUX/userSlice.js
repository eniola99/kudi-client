import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {toast} from 'react-toastify'



export const LoginUser = createAsyncThunk("login/user", async (user) => {
    try {
        const response = await axios.post(`https://kudiii.herokuapp.com/auth/login`, user)
        return response.data
    } catch (err) {
        toast.error(err.response.data)
    }

})

// export const UpdateUser = createAsyncThunk("update/user", async (user) => {
//     try {
//         const response = await axios.put(`http://localhost:5000/auth/user/${user.info._id}`, user, {
//             headers: {
//                 "token": `Bearer ${user.generateToken}`,
//                 "Content-Type": "application/json; charset=utf-8",
//             }
//         })
//         return response.data
//     } catch (err) {
//         toast.error(err.response.data)
//     }
// })


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
        }
    },
    // extraReducers: {
    //     [UpdateUser.pending]: (state) => {
    //         state.pending = true;
    //         state.error = false;
    //     },
    //     [UpdateUser.fulfilled]: (state, action) => {
    //         state.pending = false;
    //         state.userInfo = action.payload;
    //     },
    //     [UpdateUser.rejected]: (state) => {
    //         state.pending = false;
    //         state.error = true;
    //     }
    // }
})

export const { LogoutCall } = userSlice.actions

export default userSlice.reducer;