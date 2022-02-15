import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../form.css'
import { signUpCall } from '../context/authContext/apiCall';
import { AuthContext } from '../context/authContext/AuthContext';
import Login from './Login'



const Signup = () => {
    const { isFetching, dispatch } = useContext(AuthContext)
    const { user } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            firstName: '', lastName: '', email: '', password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'weak password').required('Required')
        }),
        onSubmit: values => {
            console.log(values)
            signUpCall(values, dispatch)
            
          },
    })
    return (
        <>
        {user ? <Login /> : <div className='container'>
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

                <div>
                <button type='submit' disabled={isFetching}>Register</button>
                <h2><Link to='/login'>Already as an account</Link></h2>
                </div>
            </form>
        </div> }
        
        </>
    )
}

export default Signup