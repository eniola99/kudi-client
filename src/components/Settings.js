import React,  { useContext } from 'react'
import { Typography } from 'antd';
import '../form.css'
import { AuthContext } from '../context/authContext/AuthContext';
import { logoutCall } from '../context/authContext/apiCall';
import Homepage from './Homepage';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


const { Title } = Typography
const Settings = () => {
    const {  dispatch } = useContext(AuthContext)
    const { user } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            email: '',  password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'weak password').required('Required')
        }),
        onSubmit: async (values) => {
            try {
                await axios.put(`https://kudiii.herokuapp.com/auth/user/${user.user._id}`, values, {
                    headers: {
                        "token": `bearer ${user.generateToken}`
                    }
                })
            } catch (err) { }
        }
    })
    
    const logoutHandler = (e) => {
        e.preventDefault()
        logoutCall(dispatch)
    }
   
    return (
        <>
        {user ?
        <div className='settings-container'>
            <p>under construction</p>

            <div><Title level={4}>Update your account {user.info.firstName} :)</Title></div>
            <Title level={5} style={{paddingTop: "20px"}} >update account details</Title>
            <form onSubmit={formik.handleSubmit} className='form-style2'>

                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? (<div className='required'>{formik.errors.email}</div>) : null}

                <label htmlFor='password'>Password</label>
                <input  type='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? (<div className='required'>{formik.errors.password}</div>) : null}

                <div>
                <button type='submit' >Update</button>
                </div>
            </form>
            <div className='form-delete'>
                <button type='submit' onClick={logoutHandler}>Logout</button>
               
            </div>
        </div>
        : < Homepage />}
        </>
    )
}

export default Settings