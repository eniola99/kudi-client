import React from 'react'
import { Typography } from 'antd';
import '../form.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateUser, LogoutCall } from '../REDUX/userSlice';


const { Title } = Typography
const Settings = () => {
    const user = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch()

   
    const formik = useFormik({
        initialValues: {
            email: user.info.email,  password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'weak password').required('Required')
        }),
        onSubmit: async (values) => {
            // dispatch(UpdateUser(values))
        }
    })

    // console.log(user.generateToken)
    
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(LogoutCall())
    }
   
    return (
        <>
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
        </>
    )
}

export default Settings