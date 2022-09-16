import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../form.css'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Loader from './Loader'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress'





const Signup = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const navigate = useNavigate()
    // const [ loading, setLoading ] = useState(false)
    const [values, setValues] = useState(false);


    const formik = useFormik({
        initialValues: {
            firstName: '', lastName: '', email: '', password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),

        onSubmit: async (values) => {
            setIsLoading(true)
                await axios.post(`http://localhost:8800/auth/register`, values) //(`https://kudiii.herokuapp.com/auth/register`, values)
                navigate("/success")
                .then((res) => toast.info(res.data))
            setIsLoading(false)
        }
    })
    const handleShowPassword = () => {
        setValues(!values)
    }

    return (
        <>
        <div className='container'>
            <Typography.Title level={3} style={{textAlign: 'center', padding: 30, margin: 20}}>kudiCrypto Family</Typography.Title>
            <form onSubmit={formik.handleSubmit} className='form-style'>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName}/>
                {formik.touched.firstName && formik.errors.firstName ? (<div className='required'>{formik.errors.firstName}</div>) : null}

                <label htmlFor='lastName'>Last Name</label>
                <input type='text' name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}/>
                {formik.touched.lastName && formik.errors.lastName ? (<div className='required'>{formik.errors.lastName}</div>) : null}

                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                {formik.touched.email && formik.errors.email ? (<div className='required'>{formik.errors.email}</div>) : null}

                <label htmlFor='password'>Password</label>
                <div style={{display: 'flex', flexDirection: 'colunm', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                <input type={ values ? 'text' : 'password'} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                {
                !values ?
                <VisibilityIcon style={{position: 'absolute', right: '10px', cursor: "pointer", width: '20px'}} onClick={handleShowPassword}/>
                :
                <VisibilityOffIcon style={{position: 'absolute', right: '10px', cursor: "pointer", width: '20px'}} onClick={handleShowPassword}/>
                }                
                </div>
                {formik.touched.password && formik.errors.password ? (<div className='required'>{formik.errors.password}</div>) : null}
                
                <div className='form-delete'>
                <button type='submit' disabled={isLoading} >{isLoading ? <CircularProgress/> : <strong>Register</strong>}</button>
                <h2><Link to='/login'>Already have an account</Link></h2>
                </div>
            </form>
        </div>
        
        : </>
    )
}

export default Signup