import axios from 'axios'
import { LogoutCall } from './userSlice'

// export const LoginUser = async(user, dispatch) => {
//     dispatch(LoginStart())
//     try {
//         const res = await axios.post(`http://localhost:5000/auth/login`, user);
//         dispatch(LoginSuccess(res.data));
//     } catch (error) {
//         dispatch(LoginFailure())
//     }
// }

// export const LogoutUser = () => {
//     // await dispatch(LogoutCall());
//     console.log('this')
// }