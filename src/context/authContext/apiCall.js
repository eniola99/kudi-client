import axios from 'axios'
import { loginStart, loginFailure, loginSuccess, logout } from './AuthAction';

export const  loginCall = async (user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`https://kudii.herokuapp.com/auth/login `, user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}
export const logoutCall = (dispatch) => {
    dispatch(logout())
}

export const signUpCall = async(user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`https://kudii.herokuapp.com/auth/register `, user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}