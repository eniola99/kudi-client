import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../form.css'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Loader from './Loader';



const Signup = () => {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)

    const formik = useFormik({
        initialValues: {
            firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),

        onSubmit: async (values) => {
            try {
                await axios.post(`http://localhost:5000/auth/register`, values)               //(`https://kudiii.herokuapp.com/auth/register`, values)
                setLoading(true)
                navigate("/success")
            } catch (err) {
                toast.error(err.response.data)
                setLoading(false)
             }
        }
    })
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
                <input type='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                {formik.touched.password && formik.errors.password ? (<div className='required'>{formik.errors.password}</div>) : null}

                { loading ? (< Loader />) : 
                (
                    <>
                        <button type='submit' >Register</button>
                        <h2><Link to='/login'>Already have an account</Link></h2>
                    </>
                )
                }
            </form>
        </div>
        
        : </>
    )
}

export default Signup