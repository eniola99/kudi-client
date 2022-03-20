import axios from 'axios'

import { logout } from './AuthAction';

export const  loginCall = async (user) => {
    return await axios.post(`https://kudiii.herokuapp.com/auth/login `, user)
}
export const logoutCall = (dispatch) => {
    dispatch(logout())
}