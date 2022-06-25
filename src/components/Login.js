import React from 'react'
import { Typography } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Trade from "./Trade"
import Loader from './Loader';
import {toast} from 'react-toastify'
import { LoginUser } from "../../src/REDUX/userSlice"
import { useSelector, useDispatch } from 'react-redux'



toast.configure()
const Login = () => {

    const { pending, error } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '', password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'weak password').required('Required')
        }),
        
        onSubmit: (values) => {
            dispatch(LoginUser(values))
        }
    })
    if(pending === true) return <Loader/>


    return (
        <>
          <div className='container'>
        <Typography.Title level={3} style={{textAlign: 'center', padding: 30, margin: 20}}>Welcome Back Mate!!!</Typography.Title>
        <form className='form-style' onSubmit={formik.handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.firstName && formik.errors.firstName ? (<div className='required'>{formik.errors.firstName}</div>) : null}
            
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.password && formik.errors.password ? (<div className='required'>{formik.errors.password}</div>) : null}

            <button type='submit'>Login</button>

        </form>
        </div>
        </>
    )
}

export default Login