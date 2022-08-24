import React from 'react'
import { Typography } from 'antd';
import '../form.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateUser, LogoutCall } from '../REDUX/userSlice';

//img
import profile from '../../src/profile.jpg'

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography2 from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';





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
    
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(LogoutCall())
    }
   
    return (
        <>
            <div><Title level={4}>Hello, {user.info.firstName} :)</Title></div>

        <Masonry columns={2} spacing={4}>
            <Card>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent="center" alignItems='center' direction="row">
                    <Grid item xs={4}>
                        <Avatar  sx={{ width: 100, height: 100 }}>NQ</Avatar>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography2 variant="subtitle2" component="div" gutterBottom > First Name: {user.info.firstName} </Typography2>
                        <Typography2 variant="subtitle2" component="div" gutterBottom > Last Name: {user.info.lastName} </Typography2>                        
                    </Grid>
                    <Grid item xs={4}>
                        <Typography2 variant="caption text" component="div" gutterBottom > Toogle visibility</Typography2>
                        {/* <Typography2 variant="subtitle2" component="div" gutterBottom > email: {user.info.email} </Typography2> */}
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent sx={{ flexGrow: 1}}>
                    <Typography2 variant='h6' component='div'> Personal Information</Typography2>
                </CardContent>
            </Card>

        </Masonry>
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

        </>
    )
}

export default Settings